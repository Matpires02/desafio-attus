import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {AdminService} from '../../service/admin/admin.service';
import {UserModel} from '../../models/user/user.model';

export const userResolver: ResolveFn<UserModel> = (route, state) => {
  const id = route.params['id'];
  const userService = inject(AdminService);

  return userService.getUser(id);
};
