import { CommonUtilsModule } from '@app/common-utils';
import { AppConfigModule } from '@app/config';
import { OtherDomain, SchemaModule } from '@app/schema';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { PropertyModule } from './properties/properties.module';
import { OtherDomainModule } from './otherdomain/otherdomain.module';
import { AwsModule } from './aws/aws.module';
import { ProductCategoryModule } from './product-category/product-category.module';

@Module({
  imports: [
    SchemaModule,
    AuthModule,
    UserModule,
    AppConfigModule,
    CommonUtilsModule,
    VehicleModule,
    PropertyModule,
    OtherDomainModule,
    AwsModule,
    ProductCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
