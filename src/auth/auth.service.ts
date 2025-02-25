import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { uid } from 'rand-token';
import {
  ChangePasswordRequest,
  LoginDTO,
  LoginResponse,
  RefreshDTO,
  RegisterDTO,
} from './dto/auth';
import {
  ID,
  JwtUserPayload,
  SearchParamsDTO,
  TokenType,
  User,
  UserDocument,
  UserToken,
  UserTokenDocument,
} from 'libs/schema/src';
import { AppConfigService } from '@app/config';


@Injectable()
export class AuthService {
  constructor(
    private configService: AppConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(UserToken.name) private userTokenModel: Model<UserTokenDocument>,
    private jwtService: JwtService
  ) { }

  generateRefreshToken(currentUser: UserDocument) {
    const refresh_token = uid(30);

    const signed_refresh_token = this.jwtService.sign(
      { refreshToken: refresh_token },
      {
        secret: this.configService.getJWTConfig().secret,
      },
    );

    this.updateRefreshToken(currentUser, refresh_token);

    return signed_refresh_token;
  }

  async updateRefreshToken(currentUser: UserDocument, token: string) {
    await this.userTokenModel.findOneAndUpdate(
      {
        type: TokenType.Token,
        user: currentUser._id,
      },
      {
        $set: {
          user: currentUser._id,
          token: token,
          type: TokenType.Token,
        },
      },
      { upsert: true, new: true },
    );
  }

  private async updateLastLoggedIn(id: ID, ip: string) {
    await this.userModel
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            lastLogin: {
              ip,
            },
          },
        },
      )
      .lean();

    return;
  }

  generateAccessToken(currentUser) {
    const payload: JwtUserPayload = {
      id: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
    };

    const token = this.jwtService.sign(
      payload,
      this.configService.getJWTConfig(),
    );
    return token;
  }

  private async loginResponse(user: UserDocument): Promise<LoginResponse> {
    const refreshToken = this.generateRefreshToken(user);
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken,
      expires_in: 3600,
      email: user.email,
      id: user.id,
      role: user.role,
      profileImage: user.profileImage
    };
  }

  async login(user: LoginDTO): Promise<LoginResponse> {
    const currentUser = await this.userModel.findOne({
      email: user.email.toLowerCase(),
      isActive: true,
    });

    if (!currentUser) {
      throw new BadRequestException(
        `User with email ${user.email} is not found in database`,
      );
    }

    if (currentUser.isBlock) {
      throw new BadRequestException(
        `Your account is blocked, please contact admin`,
      );
    }

    const isMatch = await bcrypt.compare(user.password, currentUser.password);

    if (!isMatch) {
      throw new BadRequestException({
        message: 'Invalid email and/or password',
        code: 'invalid_login',
      });
    }

    return this.loginResponse(currentUser);
  }


  async refreshToken(refreshToken: RefreshDTO): Promise<LoginResponse> {
    const decoded = this.jwtService.decode(
      refreshToken.refreshToken,
      this.configService.getJWTConfig().secret,
    );

    const tokenData = await this.userTokenModel
      .findOne({
        token: decoded.refreshToken,
        type: TokenType.Token,
      })
      .populate('user')
      .lean();

    if (!tokenData) {
      throw new BadRequestException(`User is not found in database`);
    }

    const currentUser = await this.userModel.findById(tokenData.user);

    if (!currentUser) {
      throw new BadRequestException(`User is not found in database`);
    }

    return this.loginResponse(currentUser);
  }

  async register(user: RegisterDTO): Promise<LoginResponse> {
    const existingUser = await this.userModel.findOne({
      email: user.email.toLowerCase(),
    });

    if (existingUser) {
      throw new BadRequestException({
        message: 'Email is already registered',
        code: 'duplicate',
      });
    }

    const hash = await bcrypt.hash(user.password, 10);

    const newUser = await this.userModel.create({
      email: user.email.toLowerCase(),
      password: hash,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });

    return this.loginResponse(newUser);
  }


  async me(user: JwtUserPayload): Promise<User> {
    const currentUser = await this.userModel.findById(user.id);
    if (!currentUser) {
      throw new BadRequestException(`User is not found in database`);
    }
    currentUser.password = '';
    return currentUser;
  }

  async changePassword(
    reqData: ChangePasswordRequest,
    user: JwtUserPayload,
  ): Promise<void> {
    const currentUser = await this.userModel.findById(user.id);
    if (!currentUser) {
      throw new BadRequestException(`User is not found in database`);
    }
    console.log('Old Password:', reqData.oldPassword);
    console.log('Hashed Password:', currentUser.password);
    const isMatch = await bcrypt.compare(
      reqData.oldPassword,
      currentUser.password,
    );
    if (!isMatch) {
      throw new BadRequestException({
        message: 'Invalid old password',
        code: 'invalid_password',
      });
    }
    const hash = await bcrypt.hash(reqData.newPassword, 10);
    await this.userModel.findByIdAndUpdate(user.id, {
      $set: { password: hash },
    });
  }

  async list(params: SearchParamsDTO): Promise<User[]> {
    const { page = 1, limit = 10, search } = params;

    const query = search
      ? {
        $or: [
          { email: { $regex: search, $options: 'i' } },
          { username: { $regex: search, $options: 'i' } },
        ],
      }
      : {};

    const users = await this.userModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password')
      .lean();

    return users;
  }


  async forgetPassword(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    const resetToken = '123456';

    await this.userTokenModel.create({
      token: resetToken,
      type: TokenType.Email,
      user: user._id,
    });
  }

  async verifyResetToken(email: string, token: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const tokenData = await this.userTokenModel.findOne({
      user: user._id,
      token,
      type: TokenType.Email,
    });

    if (!tokenData) {
      throw new BadRequestException('Invalid or expired token');
    }
  }


  async resetPassword(email: string, token: string, newPassword: string): Promise<void> {
    await this.verifyResetToken(email, token);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
    );

    await this.userTokenModel.deleteOne({ token, type: TokenType.Email });
  }
}
