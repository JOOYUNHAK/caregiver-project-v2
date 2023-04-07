import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { PaymentController } from "./payment.controller";
import { paymentRepository } from "./payment.repository";
import { PaymentService } from "./payment.service";

@Module({
    imports: [DatabaseModule],
    controllers: [PaymentController],
    providers: [
        PaymentService,
        ...paymentRepository
    ],
})

export class PaymentModule {};