import { HttpParams } from '@angular/common/http';

export function createHttpParams(params: Record<string, any>): HttpParams {
  let httpParams = new HttpParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      httpParams = httpParams.set(key, String(value));
    }
  });

  return httpParams;
}
