import { Injectable } from "@nestjs/common";
import { UserAuthCommonMapper } from "src/user-auth-common/application/user-auth-common.mapper";

@Injectable()
export class AuthMapper extends UserAuthCommonMapper {}