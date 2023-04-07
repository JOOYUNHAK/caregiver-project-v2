import { Body, Controller, Post } from "@nestjs/common";
import { PaymentDto } from "./dto/payment.dto";
import { PaymentService } from "./payment.service";

@Controller('payment')
export class PaymentController {
    constructor(
        private paymentService: PaymentService
    ) {}

    @Post()
    async requestPaymentApproval(@Body() paymentDto: PaymentDto) {
        return this.paymentService.requestPaymentApproval(paymentDto); 
    }
}