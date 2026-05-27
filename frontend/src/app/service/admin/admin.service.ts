import {Injectable} from '@angular/core';
import {UserModel} from '../../models/user/user.model';
import {HttpClient} from '@angular/common/http';
import {UserCriteriaFilter} from '../../models/user/user-criteria.filter';
import {createHttpParams} from '../../shared/create-htttp-params.util';
import {PageResponse} from '../../models/page/page-response.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private readonly baseUrl = `${environment.apiUrl}/admin`;

  constructor(private client: HttpClient) {
  }

  deleteUser(id: string) {
    return this.client.delete<void>(`${this.baseUrl}/user/delete/${id}`);
  }

  getUser(id: string) {
    return this.client.get<void>(`${this.baseUrl}/user/${id}`);
  }

  listUsers(userCriteria?: UserCriteriaFilter) {
    const params = createHttpParams({...userCriteria})
    return this.client.get<PageResponse<UserModel[]>>(`${this.baseUrl}/user/list`, {params});
  }
}
