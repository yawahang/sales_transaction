import { UserDetailService } from './user-detail.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MvUserDetail } from './user-detail.model';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  displayedColumns: string[];
  dataSource: MvUserDetail[] = [];
  userMsg = '';

  constructor(private http: HttpClient, private uds: UserDetailService) { }

  ngOnInit() {

    this.displayedColumns = ['personId', 'userName', 'firstName', 'lastName'];
    this.getUserDetail();
  }

  getUserDetail() {

    this.userMsg = '';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST');
    headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type');

    this.http.get('http://localhost:1212/api/Account/UserDetail', {
      headers: headers,
      params: { json: JSON.stringify({ personId: 15599209 }) }
    }).subscribe((result: any) => {

      if (result) {

        this.dataSource = [result];
      } else {

        this.dataSource = [];
        this.userMsg = 'No data!';
      }
    }, error => console.error(error));
  }

  getAllUsers() {

    this.userMsg = '';
    this.uds.getAllUserDetail().subscribe((result: any) => {

      if (result && result.data) {

        this.dataSource = result.data;
      } else {

        this.dataSource = [];
        this.userMsg = 'No data!';
      }
    });
  }

}
