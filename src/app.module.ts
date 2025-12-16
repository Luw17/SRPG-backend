import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MagicModule } from './magic/magic.module';
import { CharactersheetModule } from './charactersheet/charactersheet.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:11675800@mongodb:27017/srpgdb?authSource=admin',
    ),

    UserModule,
    AuthModule,
    MagicModule,
    CharactersheetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
