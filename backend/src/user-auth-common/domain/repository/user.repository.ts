import { Repository } from "typeorm";
import { User } from "../entity/user.entity";

export interface UserRepository extends Repository<User> {};

