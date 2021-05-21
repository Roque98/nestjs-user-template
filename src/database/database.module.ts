import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject:[config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          uri: configService.database.uri
        }
      }
    })
  ],
  exports: [MongooseModule]
})
export class DatabaseModule {}
