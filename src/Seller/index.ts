
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sellers, SellerSchema } from './entities/Sellers';
import { SELLER_SERVICE } from './constants';
import { SellerService } from './services/SellerService';
import { SellerController } from './controllers/SellerController';
import { MongooseModule } from '@nestjs/mongoose';

const sellerServiceProvider = {
  provide: SELLER_SERVICE,
  useClass: SellerService,
}

@Module({
  imports: [MongooseModule.forFeature([{ name: Sellers.name, schema: SellerSchema }])],
  controllers: [SellerController],
  providers: [sellerServiceProvider],
  exports: [sellerServiceProvider]
})

export class SellerModule {}
