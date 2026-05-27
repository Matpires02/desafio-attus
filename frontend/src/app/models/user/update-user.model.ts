import {UserRole} from './user-role.enum';

export interface UpdateUserModel {
  id: string,
  activated: boolean,
  email: string,
  password: string,
  roles?: UserRole[]
}
