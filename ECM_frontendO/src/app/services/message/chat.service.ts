import { EventEmitter, Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { Message } from 'src/app/models/message/Message';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public newMessage$ = new EventEmitter<Message>();
  public receiveMessage$ = new EventEmitter<Message>();
  constructor() { }
  public sendMessage(text: string): Promise<boolean> {
    if (text) {
      let message = new Message();
      message.content = text;
      message.delivered = true;
      message.sender = "me";
      message.systemNotify = false;
      //call service with newMessage$ emitter
      timer(100).subscribe(t => this.newMessage$.emit(message));
      debugger
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
  public receiveMessage(message: Message) {
    timer(100).subscribe(t => this.receiveMessage$.emit(message));
  }
}
