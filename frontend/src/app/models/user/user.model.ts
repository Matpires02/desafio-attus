import {UserRole} from './user-role.enum';

export interface UserModel {
  email: string,
  password: string,
  roles: UserRole[]
}
