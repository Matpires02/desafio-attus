import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CreateUserModel} from '../../models/user/create-user.model';
import {UserModel} from '../../models/user/user.model';
import {UpdateUserModel} from '../../models/user/update-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/user`;

  constructor(private client: HttpClient) {
  }

  createUser(createUserModel: CreateUserModel) {
    return this.client.post<UserModel>(`${this.baseUrl}/register`, createUserModel);
  }

  updateUser(userModel: UpdateUserModel) {
    return this.client.put<UserModel>(`${this.baseUrl}/update`, userModel);
  }
}
