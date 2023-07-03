import { ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";

export const GlobalScopedValidationPipe = {
    provide: APP_PIPE,
    useValue: new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true })
}