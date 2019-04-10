import {Injectable} from '@angular/core';
import {Subject, Observer, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    ws: WebSocket;

    constructor() {
    }
    private subject: Subject<MessageEvent>;

    public connect(url): Subject<MessageEvent> {
        if (!this.subject) {
        this.subject = this.create(url);
        console.log('Successfully connected: ' + url);
        }
        return this.subject;
    }
    private create(url): Subject<MessageEvent> {
        const ws = new WebSocket(url);
        const observable = Observable.create(
        (obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        const observer = {
            next: (data: any) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return Subject.create(observer, observable);
      }
    // createObservableSocket(url: string): Observable<any> {
    //     this.ws = new WebSocket(url);
    //     return new Observable(
    //         observer => {
    //             // 什么时候发生下一个元素
    //             this.ws.onmessage = (event) => observer.next(event.data);
    //             // 什么时候抛一个异常
    //             this.ws.onerror = (event) => observer.error(event);
    //             // 什么时候发出流结束的信号
    //             this.ws.onclose = (event) => observer.complete();

    //         },
    //     );
    // }

    // sendMessage(message: string) {
    //     this.ws.send(message);
    // }
}
