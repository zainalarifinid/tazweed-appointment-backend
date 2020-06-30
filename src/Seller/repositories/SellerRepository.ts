
import { EntityRepository } from "typeorm";
import { Seller } from "../entities/Seller";
import { BaseSqlRepository } from "src/Common/BaseSqlRepository";

@EntityRepository(Seller)
export class SellerRepository extends BaseSqlRepository<Seller> {
  
}
