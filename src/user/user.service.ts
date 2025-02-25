import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtUserPayload, SearchParamsDTO, User, UserDocument } from 'libs/schema/src';
import { Model, Types } from 'mongoose';
import { ICreateUserDTO, IUserResponse, IUserUpdateRequest } from './dto/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async createUser(createUserDTO: ICreateUserDTO): Promise<void> {
    const { email, fullName, username, phoneNumber, dateOfBirth, gender, address, socialMediaLinks, jobTitle, organization, workAddress, department, idProof, certifications, notes } = createUserDTO;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = new this.userModel({
      email,
      fullName,
      username,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      socialMediaLinks,
      jobTitle,
      organization,
      workAddress,
      department,
      idProof,
      certifications,
      notes,
      isActive: true,
      isBlock: false,
    });

    await newUser.save();
  }


  async get(params: SearchParamsDTO): Promise<IUserResponse> {
    const query: any = { isActive: true };
    let skip = 0;
    let limit = 100;

    if (params.limit) {
      limit = params.limit;
    }

    if (params.page) {
      skip = params.page * params.limit;
    }

    if (params.search) {
      query['$or'] = [
        { username: { $regex: params.search || '', $options: 'i' } },
        { email: { $regex: params.search || '', $options: 'i' } },
      ];
    }

    const result = await this.userModel
      .aggregate([
        { $match: query },
        {
          $facet: {
            users: [{ $skip: skip }, { $limit: limit }],
            total: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ])
      .exec();

    return {
      users: result[0].users,
      total: result[0].total.length > 0 ? result[0].total[0].count : 0,
    };
  }

  async list(params: SearchParamsDTO): Promise<User[]> {
    const query: any = {
      isActive: true,
    };

    if (params.search) {
      query['$or'] = [
        { fullName: { $regex: params.search || '', $options: 'i' } },
      ];
    }

    const result = await this.userModel
      .aggregate([
        { $match: query },
        { $limit: 100 },
      ])
      .exec();

    return result;
  }

  async getById(id: string): Promise<User> {
    const query: any = {
      _id: new Types.ObjectId(id),
    };

    const result = await this.userModel
      .aggregate([
        { $match: query },
      ])
      .exec();

    return result[0];
  }

  async update(id: string, reqData: IUserUpdateRequest): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      $set: reqData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      $set: {
        isActive: false,
      },
    });
  }

  // async toggleBlock(id: string, block: boolean): Promise<void> {
  //   await this.userModel.findByIdAndUpdate(id, {
  //     $set: {
  //       isBlock: block,
  //     },
  //   });
  // }

  // async getAllUsers(): Promise<User[]> {
  //   const users = await this.userModel
  //     .find()
  //     .select('-password')
  //     .lean();

  //   if (!users.length) {
  //     throw new BadRequestException('No users found');
  //   }

  //   return users;
  // }
}
