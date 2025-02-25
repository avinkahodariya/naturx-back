import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) { }

  public async getMongoConfig() {
    const user = this.configService.get('MONGO_USER');
    const password = this.configService.get('MONGO_PASSWORD');
    const host = this.configService.get('MONGO_HOST');
    const db = this.configService.get('MONGO_DATABASE');
    const result = {
      uri: `mongodb+srv://${user}:${password}@${host}/${db}?retryWrites=true&w=majority`,
    };
    return result;
  }

  public getOpenAIKey() {
    return {
      openAIKey: this.configService.get('OPENAI_API_KEY'),
    };
  }

  public getPineConeAIKey() {
    return {
      pineConeKey: this.configService.get('PINECONE_API_KEY'),
    };
  }

  public getEmbeddingConfig() {
    return {
      path: `${this.configService.get('EMBEDDING_API_PATH')}chats/emebeddings`,
    };
  }

  public getJWTConfig() {
    return {
      // algorithms: ['HS256' as const],
      secret: this.configService.get('JWT_SECRET'),
    };
  }

  public getNodeENV() {
    return {
      nodeEnv: this.configService.get('NODE_ENV'),
    };
  }

  public getAWSConfig() {
    return {
      accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_REGION'),
      bucket: this.configService.get('AWS_S3_BUCKET'),
    };
  }


  public getSendGridConfig() {
    return {
      apiKey: this.configService.get('SENDGRID_API_KEY'),
      templateId: this.configService.get('SENDGRID_TEMPLATE_ID'),
    };
  }

}
