import Bootpay from '@bootpay/backend-js';
import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { PaymentDto } from './dto/payment.dto';
import { Payment } from './entity/payment.entity';

@Injectable()
export class PaymentService {
    constructor(
        private configService: ConfigService,
        @Inject('PAYMENT_REPOSITORY')
        private paymentRepository: Repository<Payment>
    ) {}

    async requestPaymentApproval(paymentDto: PaymentDto) {
        this.setBootpayConfiguration();

        try {
            await Bootpay.getAccessToken();
            const { receiptId } = paymentDto;
            const response = await Bootpay.confirmPayment(receiptId);
            const { method, price, receipt_id, order_id, requested_at, purchased_at } = response;
            const id = order_id.substring(11)
        }
        catch(err) {
            throw new HttpException(
                err.message, 
                HttpStatus.PAYMENT_REQUIRED
            );
        }

    }

    setBootpayConfiguration() {
        const applicationId = this.configService.get<string>('payment.applicationId');
        const privateKey = this.configService.get<string>('payment.privateKey');
        
        Bootpay.setConfiguration({
            application_id: applicationId,
            private_key: privateKey
        });
    }
}