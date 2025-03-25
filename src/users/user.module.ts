import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserModel, UserSchema } from './schemas/user.schema'; // Importa el modelo y el esquema
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MailModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]), // 💡 Registra el modelo
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Usa un secreto seguro
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 💡 Expórtalo si otro módulo lo necesita
})
export class UserModule {}