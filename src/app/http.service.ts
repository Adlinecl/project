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
    // private indexUrl =  'http://192.168.0.105:8080';
    private indexUrl =  'http://127.0.0.1:8080';

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
        return this.http.post(`${this.indexUrl}/createRole`, data, { headers: this.httpHeader});
    }
    getPermission(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getPermissions`, { headers: this.httpHeader });
    }
    // id \ []
    getRole(id: string): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getRole/${id}`, { headers: this.httpHeader });
    }
    getUserById(id: string): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getUser/${id}`, { headers: this.httpHeader });
    }
    getRoleList(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getRole`, { headers: this.httpHeader });
    }
    logout(data: any): Observable<any> {
        this.set();
        return this.http.post(`${this.indexUrl}/logout`, data, { headers: this.httpHeader });
    }
    updatePws(data: any): Observable<any> {
        this.set();
        return this.http.put(`${this.indexUrl}/updatePws`, data, { headers: this.httpHeader });
    }
    putenterIn(data: any): Observable<any> {
        this.set();
        return this.http.put(`${this.indexUrl}/login`, data, { headers: this.httpHeader });
    }
    getUser(id: string): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getRole/${id}`, { headers: this.httpHeader });
    }
    updateUserOrRole(data: any): Observable<any> {
        this.set();
        return this.http.put(`${this.indexUrl}/updateUserOrRole`, data, { headers: this.httpHeader});
    }
    gcompany(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/company`, { headers: this.httpHeader });
    }
    postcompany(data: any): Observable<any> {
        this.set();
        return this.http.post(`${this.indexUrl}/company`, data, { headers: this.httpHeader });
    }
    putcompany(data: any): Observable<any> {
        this.set();
        return this.http.put(`${this.indexUrl}/company`, data, { headers: this.httpHeader });
    }
    deletecompany(data: any): Observable<any> {
        this.set();
        return this.http.request('delete', `${this.indexUrl}/company`, {
            body: data,
            headers: this.httpHeader,
        });
        // return this.http.delete(`${this.indexUrl}/company`, data,{ headers: this.httpHeader });
    }
    // const params = new HttpParams({ fromString: objectToParams(permit) });
    //     return this.http.get(this.indexUrl, { params: params });


    creatGoods(data: any): Observable<any> {
        this.set();
        return this.http.post(`${this.indexUrl}/goods`, data, { headers: this.httpHeader });
    }
    getGoodsType(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getGoodsType`, { headers: this.httpHeader });
    }
    getCompany(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/getCompany`, { headers: this.httpHeader });
    }
    findGoods(data: any): Observable<any> {
        this.set();
        return this.http.post(`${this.indexUrl}/findGoods`, data, { headers: this.httpHeader });
    }
    findTradingInfo(data: any): Observable<any> {
        this.set();
        return this.http.post(`${this.indexUrl}/findTradingInfo`, data, { headers: this.httpHeader });
    }
    putgoods(data: any): Observable<any> {
        this.set();
        return this.http.put(`${this.indexUrl}/goods`, data, { headers: this.httpHeader });
    }
    getactivitytype(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/activity/{SALES}`, { headers: this.httpHeader });
    }
    getactivity(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/activity/{all}`, { headers: this.httpHeader });
    }
    creatActivity(data: any): Observable<any> {
        this.set();
        return this.http.post(`${this.indexUrl}/activity`, data, { headers: this.httpHeader });
    }
    stopActivity(data: any): Observable<any> {
        this.set();
        return this.http.put(`${this.indexUrl}/activity`, data, { headers: this.httpHeader });
    }

    orderList(): Observable<any> {
        this.set();
        return this.http.get(`${this.indexUrl}/orderList`, { headers: this.httpHeader });
    }

    getUsers(data: any): Observable<any> {
        this.set();
        return this.http.post(`${this.indexUrl}/getUsers`, data, { headers: this.httpHeader });
    }

    editUser(data: any): Observable<any> {
        this.set();
        return this.http.put(`${this.indexUrl}/User`, data, { headers: this.httpHeader });
    }
    deleteUser(data: any): Observable<any> {
        this.set();
        return this.http.request('delete', `${this.indexUrl}/User`, {
            body: data,
            headers: this.httpHeader,
        });
    }
    getAccountInfo(data: any): Observable<any> {
        this.set();
        return this.http.post(`${this.indexUrl}/getAccountInfo`, data, { headers: this.httpHeader });
    }
}
