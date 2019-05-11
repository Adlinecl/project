import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import {map} from 'rxjs/operators';

// const USE_SOCKET_URL = 'ws://192.168.0.108:8081/websocket';
const USE_SOCKET_URL = 'ws://127.0.0.1:8080/websocket';
export interface Message {
    author: string ;
    message: string ;
}

@Injectable()
export class UserSocketService {
    public messages: Subject<any>;
    constructor(wsService: WebSocketService) {
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        this.messages = <Subject<any>> wsService
            .connect(USE_SOCKET_URL)
            .pipe(map((response: MessageEvent): any => {
                console.log(response);
                const data = response.data;
                return data;
            }));
    }
}
