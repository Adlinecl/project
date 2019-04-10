import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import {map} from 'rxjs/operators';

const USE_SOCKET_URL = 'ws://localhost:8080';

export interface Message {
    author: string ;
    message: string ;
}

@Injectable()
export class UserSocketService {
    public messages: Subject<Message>;
    constructor(wsService: WebSocketService) {
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        this.messages = <Subject<Message>> wsService
            .connect(USE_SOCKET_URL)
            .pipe(map((response: MessageEvent): Message => {
                const data = JSON.parse(response.data);
                return {
                    author: data.author,
                    message: data.message
                };
            }));
    }
}
