import { Module } from '@nestjs/common';
import { DBSchemas } from 'libs/schema/src';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';
import { AwsModule } from 'src/aws/aws.module';
import { Db } from 'mongodb';
import { AwsService } from 'src/aws/aws.service';

@Module({
  imports: [DBSchemas.user, DBSchemas.aws, AuthModule, AwsModule],
  controllers: [UserController],
  providers: [UserService, AwsService],
})
export class UserModule { }
