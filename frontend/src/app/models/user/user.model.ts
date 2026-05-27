import {UserRole} from './user-role.enum';

export interface UserModel {
  id: string,
  email: string,
  password: string,
  roles: UserRole[],
  activated: boolean,
}
