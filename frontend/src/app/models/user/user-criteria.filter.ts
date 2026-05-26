import {Page} from '../page/page.model';

export interface UserCriteriaFilter extends Page{
  email?: string,
  roles?: string[],
}
