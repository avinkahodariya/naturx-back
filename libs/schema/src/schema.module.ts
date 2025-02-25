import { Global, Module, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  AWSSchema,
  AWSSchemaSchema,
  OtherDomain,
  OtherDomainSchema,
  Property,
  PropertySchema,
  User,
  UserSchema,
  UserToken,
  UserTokenSchema,
  Vehicle,
  VehicleSchema,
  Event,
  EventSchema,
} from './schema';
import { AppConfigModule, AppConfigService } from '@app/config';
import {
  ProductCategory,
  ProductCategorySchema,
} from './schema/products-category.schema';

@Global()
@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: async (configService: AppConfigService) =>
        configService.getMongoConfig(),
    }),
  ],
  providers: [],
  exports: [],
})
export class SchemaModule {
  constructor(private appConfigService: AppConfigService) {
    const environment = this.appConfigService.getNodeENV();
    if (['TESTNET', 'DEVELOPMENT', 'DEV'].includes(environment.nodeEnv)) {
      mongoose.set('debug', true);
    }
  }
}

export const DBSchemas = {
  user: MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  userToken: MongooseModule.forFeature([
    { name: UserToken.name, schema: UserTokenSchema },
  ]),
  vehicle: MongooseModule.forFeature([
    { name: Vehicle.name, schema: VehicleSchema },
  ]),
  property: MongooseModule.forFeature([
    { name: Property.name, schema: PropertySchema },
  ]),
  otherdomain: MongooseModule.forFeature([
    { name: OtherDomain.name, schema: OtherDomainSchema },
  ]),
  aws: MongooseModule.forFeature([
    { name: AWSSchema.name, schema: AWSSchemaSchema },
  ]),
  productCategory: MongooseModule.forFeature([
    { name: ProductCategory.name, schema: ProductCategorySchema },
  ]),
};
