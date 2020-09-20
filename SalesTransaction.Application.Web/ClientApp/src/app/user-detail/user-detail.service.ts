import { WebApiService } from './../../core/services/web-api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class UserDetailService {

  constructor(private api: WebApiService) {

  }

  getUserDetail(json: any): Observable<any> {

    return this.api.get('Account/UserDetail', { json: JSON.stringify(json) });
  }

  getAllUserDetail(): Observable<any> {

    return this.api.get('Account/AllUserDetail');
  }

}
