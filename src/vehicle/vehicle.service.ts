import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SearchParamsDTO, Vehicle, VehicleDocument } from 'libs/schema/src';
import { Model, Types } from 'mongoose';
import { ICreateVehicleDTO, IVehicleResponse, IVehicleUpdateRequest } from './dto/vehicle';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private vehicleModel: Model<VehicleDocument>,
  ) { }

  async createVehicle(createVehicleDTO: ICreateVehicleDTO): Promise<void> {
    const { ownerName, dateOfManufacture, vehicleType, model, vinNumber, licensePlateNumber, dateOfPurchase, purchasePrice, insuranceProvider, policyNumber, idProof, coverageDetails, expiryDate, lateServiceDate, serviceProviderName, notes } = createVehicleDTO;

    const existingVehicle = await this.vehicleModel.findOne({ vinNumber }).exec();
    if (existingVehicle) {
      throw new BadRequestException('Vehicle with this VIN number already exists');
    }

    const newVehicle = new this.vehicleModel({
      ownerName,
      dateOfManufacture,
      vehicleType,
      model,
      vinNumber,
      licensePlateNumber,
      dateOfPurchase,
      purchasePrice,
      insuranceProvider,
      policyNumber,
      idProof,
      coverageDetails,
      expiryDate,
      lateServiceDate,
      serviceProviderName,
      notes,
    });

    await newVehicle.save();
  }

  async get(params: SearchParamsDTO): Promise<IVehicleResponse> {
    const query: any = {};
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
        { vinNumber: { $regex: params.search || '', $options: 'i' } },
        { ownerName: { $regex: params.search || '', $options: 'i' } },
      ];
    }

    const result = await this.vehicleModel
      .aggregate([
        { $match: query },
        {
          $facet: {
            vehicles: [{ $skip: skip }, { $limit: limit }],
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
      vehicles: result[0].vehicles,
      total: result[0].total.length > 0 ? result[0].total[0].count : 0,
    };
  }


  async getById(id: string): Promise<Vehicle> {
    const query: any = {
      _id: new Types.ObjectId(id),
    };

    const result = await this.vehicleModel
      .aggregate([
        { $match: query }
      ])
      .exec();

    return result[0];
  }

  async update(id: string, reqData: IVehicleUpdateRequest): Promise<void> {
    await this.vehicleModel.findByIdAndUpdate(id, {
      $set: reqData,
    });
  }

  async delete(id: string): Promise<void> {
    await this.vehicleModel.findByIdAndDelete(id);
  }
}
