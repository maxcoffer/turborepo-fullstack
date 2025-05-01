import { Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, ".env"],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
