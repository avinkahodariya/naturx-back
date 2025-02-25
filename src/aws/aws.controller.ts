import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AwsService, UploadUrl } from './aws.service';
import { UploadDTO } from './dto/upload';
import { Public } from '@app/schema';

@Controller('aws')
@ApiBearerAuth()
@ApiTags('aws')
export class AwsController {
  constructor(private awsService: AwsService) {}

  @Post('singed-url')
  @Public()
  async requestUploadUrl(@Body() uploadProps: UploadDTO): Promise<UploadUrl> {
    return await this.awsService.requestUploadUrl(uploadProps);
  }
  
}
