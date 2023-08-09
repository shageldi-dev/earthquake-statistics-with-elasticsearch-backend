import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SearchModule } from "./search/search.module";
import { ConfigModule } from "@nestjs/config";
import { PlacesModule } from "./places/places.module";
import { APP_PIPE } from "@nestjs/core";
import { ValidationPipe } from "./pipe/validation.pipe";

@Module({
  imports: [
    SearchModule,
    ConfigModule.forRoot({
      envFilePath: [".env"],
    }),
    PlacesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
