import {UserRole} from './user-role.enum';

export interface CreateUserModel {
  email: string,
  password: string,
  roles?: UserRole[]
}
