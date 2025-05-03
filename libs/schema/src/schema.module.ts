import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  AWSSchema,
  AWSSchemaSchema,
  OtherDomain,
  OtherDomainSchema,
  User,
  UserSchema,
  UserToken,
  UserTokenSchema,
  Architect,
  ArchitectSchema,
  Area,
  AreaSchema,
  CustomerSource,
  CustomerSourceSchema,
  ProductCategory,
  ProductCategorySchema,
  Products,
  ProductsSchema,
  Customer,
  CustomerSchema,
  Quotation,
  QuotationSchema,
  QuotationItem,
  QuotationItemSchema,
  Company,
  CompanySchema,
} from './schema';
import { AppConfigModule, AppConfigService } from '@app/config';

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
  otherdomain: MongooseModule.forFeature([
    { name: OtherDomain.name, schema: OtherDomainSchema },
  ]),
  aws: MongooseModule.forFeature([
    { name: AWSSchema.name, schema: AWSSchemaSchema },
  ]),
  productCategory: MongooseModule.forFeature([
    { name: ProductCategory.name, schema: ProductCategorySchema },
  ]),
  area: MongooseModule.forFeature([{ name: Area.name, schema: AreaSchema }]),
  architect: MongooseModule.forFeature([
    { name: Architect.name, schema: ArchitectSchema },
  ]),
  customerSource: MongooseModule.forFeature([
    { name: CustomerSource.name, schema: CustomerSourceSchema },
  ]),
  products: MongooseModule.forFeature([
    { name: Products.name, schema: ProductsSchema },
  ]),
  customer: MongooseModule.forFeature([
    { name: Customer.name, schema: CustomerSchema },
  ]),
  quotation: MongooseModule.forFeature([
    { name: Quotation.name, schema: QuotationSchema },
  ]),
  quotationItem: MongooseModule.forFeature([
    { name: QuotationItem.name, schema: QuotationItemSchema },
  ]),
  company: MongooseModule.forFeature([
    { name: Company.name, schema: CompanySchema },
  ]),
};
