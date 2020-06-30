
import { EntityRepository } from "typeorm";
import { User } from "../entities/User";
import { BaseSqlRepository } from "src/Common/BaseSqlRepository";

@EntityRepository(User)
export class UserRepository extends BaseSqlRepository<User> {
  
}
