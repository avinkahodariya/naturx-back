import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company, CompanyDocument, SearchParamsDTO } from '@app/schema';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  // Create a new company
  async createCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // Perform case-insensitive uniqueness check with sanitized fields
    const sanitizedCreateCompanyDto = {
      ...createCompanyDto,
      companyName: createCompanyDto.companyName.trim().toLowerCase(),
      registrationNumber: createCompanyDto.registrationNumber
        .trim()
        .toLowerCase(),
      email: createCompanyDto.email.trim().toLowerCase(),
      gstNumber: createCompanyDto.gstNumber.trim().toLowerCase(),
      taxNumber: createCompanyDto.taxNumber.trim().toLowerCase(),
      panNumber: createCompanyDto.panNumber.trim().toLowerCase(),
      website: createCompanyDto.website.trim().toLowerCase(),
    };

    const existingCompany = await this.companyModel.findOne({
      $or: [
        {
          companyName: {
            $regex: new RegExp(
              `^${sanitizedCreateCompanyDto.companyName}$`,
              'i',
            ),
          },
        },
        {
          registrationNumber: {
            $regex: new RegExp(
              `^${sanitizedCreateCompanyDto.registrationNumber}$`,
              'i',
            ),
          },
        },
        {
          email: {
            $regex: new RegExp(`^${sanitizedCreateCompanyDto.email}$`, 'i'),
          },
        },
        {
          gstNumber: {
            $regex: new RegExp(`^${sanitizedCreateCompanyDto.gstNumber}$`, 'i'),
          },
        },
        {
          taxNumber: {
            $regex: new RegExp(`^${sanitizedCreateCompanyDto.taxNumber}$`, 'i'),
          },
        },
        {
          panNumber: {
            $regex: new RegExp(`^${sanitizedCreateCompanyDto.panNumber}$`, 'i'),
          },
        },
        {
          website: {
            $regex: new RegExp(`^${sanitizedCreateCompanyDto.website}$`, 'i'),
          },
        },
      ],
    });

    if (existingCompany) {
      throw new ConflictException(
        'A company with the same details already exists.',
      );
    }

    const company = new this.companyModel(createCompanyDto);
    return company.save();
  }

  // Get all companies
  async getAllCompanies(
    params: SearchParamsDTO,
  ): Promise<{ list: Company[]; total: number }> {
    const query: any = {};
    const skip = params.page * params.limit || 0;
    const limit = params.limit || 100;
    if (params.isActive) {
      query.isActive = params.isActive;
    }
    if (params.search) {
      const regex = new RegExp(params.search, 'i');
      query.$or = [{ name: regex }, { contactNo: regex }];
    }
    const list = await this.companyModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    const total = await this.companyModel.countDocuments().exec();

    return { list, total };
  }

  // Get company by ID
  async getCompanyById(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }

  // Update company by ID
  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyModel
      .findByIdAndUpdate(id, updateCompanyDto, { new: true })
      .exec();
  }

  // Delete company by ID
  async deleteCompany(id: string): Promise<Company> {
    return this.companyModel.findByIdAndDelete(id).exec();
  }
}
