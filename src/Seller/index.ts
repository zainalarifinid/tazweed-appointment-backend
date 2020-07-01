
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/Seller';
import { SellerRepository } from './repositories/SellerRepository';
import { SELLER_SERVICE } from './constants';
import { SellerService } from './services/SellerService';
import { SellerController } from './controllers/SellerController';

const sellerServiceProvider = {
  provide: SELLER_SERVICE,
  useClass: SellerService,
}

@Module({
  imports: [TypeOrmModule.forFeature([Seller, SellerRepository])],
  controllers: [SellerController],
  providers: [sellerServiceProvider],
  exports: [sellerServiceProvider]
})

export class SellerModule {}
