import {UserRole} from './user-role.enum';

export interface UpdateUserModel {
  email: string,
  password: string,
  roles?: UserRole[]
}
