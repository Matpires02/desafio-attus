import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CreateUserModel} from '../../models/user/create-user.model';
import {UserModel} from '../../models/user/user.model';
import {UpdateUserModel} from '../../models/user/update-user.model';
import {PageResponse} from '../../models/page/page-response.model';
import {UserCriteriaFilter} from '../../models/user/user-criteria.filter';
import {createHttpParams} from '../../utils/create-htttp-params.util';

@Injectable({
  providedIn: 'root',
})
export class User {
  private readonly baseUrl = `${environment.apiUrl}/user`;
  constructor(private client: HttpClient) {
  }

  createUser(createUserModel: CreateUserModel) {
    return this.client.post<UserModel>(`${this.baseUrl}/create`, createUserModel);
  }

  updateUser(userModel: UpdateUserModel) {
    return this.client.put<UserModel>(`${this.baseUrl}/update`, userModel, { withCredentials: true});
  }

  deleteUser(id: number) {
    return this.client.delete<void>(`${this.baseUrl}/delete/${id}`, { withCredentials: true});
  }

  listUsers(userCriteria?: UserCriteriaFilter) {
    const params = createHttpParams({...userCriteria})
    return this.client.get<PageResponse<UserModel[]>>(`${this.baseUrl}/list`, {params, withCredentials: true});
  }
}
