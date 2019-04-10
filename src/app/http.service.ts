import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { InitServiceProvider } from './init/init-service';
export interface IServerRes {
    code?: number;
    message?: string;
    data?: object;
}
// tslint:disable-next-line: no-unsafe-any
export interface IResultData<T> {
    code: number;
    msg: string;
    data: T;
}
// export interface IToken {
//     token: string;
// }
@Injectable()
export class HttpService {
    httpHeader: HttpHeaders = new HttpHeaders();
    constructor(private http: HttpClient,
                public router: Router,
            ) {
    }
    private indexUrl =  'http://192.168.0.105:8080';
    async set(token?: string) {
        token = localStorage.getItem('token');
        if (token) {
            token = JSON.parse(token);
            console.log('token', token);
            this.httpHeader = new HttpHeaders().set('token', token);
        }
    }
    enterIn(data: any): Observable<any> {
        return this.http.post(`${this.indexUrl}/login`, data);
    }
    createRole(data: any): Observable<any> {
        this.set();
        return this.http.put(`${this.indexUrl}/createRole`, data, { headers: this.httpHeader});
    }
    getPermission(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getPermissions`, { headers: this.httpHeader });
    }
    getRole(name: string): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getRole/${name}`, { headers: this.httpHeader });
    }
    logout(data: any): Observable<any> {
        return this.http.post(`${this.indexUrl}/logout`, data, { headers: this.httpHeader });
    }
}
