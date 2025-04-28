import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT ?? 3001);
}
bootstrap().catch((error) => {
  console.error("Error during bootstrap:", error);
  process.exit(1);
});
