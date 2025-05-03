import { CommonUtilsModule } from '@app/common-utils';
import { AppConfigModule } from '@app/config';
import { SchemaModule } from '@app/schema';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OtherDomainModule } from './otherdomain/otherdomain.module';
import { AwsModule } from './aws/aws.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { AreaModule } from './area/area.module';
import { CustomerSourceModule } from './customer-source/customer-source.module';
import { ArchitectModule } from './architect/architect.module';
import { ProductModule } from './products/products.module';
import { CustomerModule } from './customer/customer.module';
import { QuotationModule } from './quotation/quotation.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    SchemaModule,
    AuthModule,
    UserModule,
    AppConfigModule,
    CommonUtilsModule,
    OtherDomainModule,
    AwsModule,
    AreaModule,
    ArchitectModule,
    CustomerSourceModule,
    ProductCategoryModule,
    ProductModule,
    CustomerModule,
    QuotationModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
