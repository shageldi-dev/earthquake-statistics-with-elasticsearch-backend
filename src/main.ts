import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { appConsoleValue } from "./common/constant";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000, () => {
    console.log(appConsoleValue);
  });
}

bootstrap().then(() => console.log("Running..."));
