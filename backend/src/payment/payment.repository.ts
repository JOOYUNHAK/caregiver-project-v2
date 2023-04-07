import { DataSource } from 'typeorm'
import { Payment } from './entity/payment.entity'

export const paymentRepository = [
    {
        provide: 'PAYMENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Payment),
        inject: ['DATA_SOURCE']
    }
]