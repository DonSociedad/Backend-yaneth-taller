import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // Obtener la URI del ConfigService pero usar las opciones de databaseConfig
        const uri = configService.get('MONGODB_URI');
        return {
          uri,
          ...databaseConfig.options,
        };
      },
    }),
    UserModule,
    MailModule,
  ],
})
export class AppModule {
}