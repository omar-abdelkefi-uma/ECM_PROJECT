import { Component, OnInit, Input, ViewChild, ElementRef, } from '@angular/core';
import { Group } from '../group-list/group-list.component'
import { HttpClient } from '@angular/common/http';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { of } from 'rxjs'
import { User } from 'src/app/models/user/user';
import { Message } from 'src/app/models/message/Message';
import { MessageService } from 'src/app/services/message/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { ChatService } from 'src/app/services/message/chat.service';
import { Recipient } from 'src/app/models/message/Recipient';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
@Component({
  selector: 'vng-chat-group-messages',
  templateUrl: './group-messages.component.html',
  styleUrls: ['./group-messages.component.scss'],
  animations: [trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      animate(300, keyframes([
        style({ opacity: 0, transform: 'translateY(-100%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(15px)', offset: 0.3 }),
        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
      ]))
    ]),
    transition('* => void', [
      animate(300, keyframes([
        style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
        style({ opacity: 1, transform: 'translateY(-15px)', offset: 0.7 }),
        style({ opacity: 0, transform: 'translateY(100%)', offset: 1.0 })
      ]))
    ])
  ])
  ]
})
export class GroupMessagesComponent implements OnInit {
  allmessages: Message[];
  messagesofuserclicked: Message[];
  userconnecte: User = new User();
  constructor(private webSocketService: WebsocketService, private storageservice: StorageService, private chatService: ChatService, private messageservice: MessageService) {
  }
  private _activeGroup: User;
  public creationDate: Date;
  stompClient: any;
  @ViewChild('bottom_anchor') private myScrollContainer: ElementRef;
  get group() {
    return this._activeGroup;
  }
  //from chat component
  @Input() set group(val) {
    this._activeGroup = val;
    this.messagesofuserclicked = this.getMessages(this._activeGroup.id);
  }
  public messages$: Promise<Message[]>;
  reloadmessages() {
    this.userconnecte = this.storageservice.getuserfromcookieorsession();
    this.messageservice.getMessagesList().subscribe(
      data => {
        this.allmessages = data;
        console.log(this._activeGroup)
        this.messagesofuserclicked = this.getMessages(this._activeGroup.id);
      }
    );
  }
  ngOnInit() {
    this.reloadmessages();
    this.stompClient = this.webSocketService.connect();
    this.chatService.receiveMessage$.subscribe((data) => {
      debugger
      let message = data;
      this.messagesofuserclicked.push(message);
    })
    this.chatService.newMessage$.subscribe((data) => {
      //data contain message that user add
      let message = data;
      message.user = this.userconnecte;
      message.recipient = new Recipient();
      message.recipient.user = this._activeGroup;
      message.recipient.containgroup = false;
      console.log(this._activeGroup)
      debugger
      //this.stompClient.send("/app/addmessage",{}, JSON.stringify(message));
      this.messageservice.createMessage(message).subscribe(
        data => {
          console.log(data);
          debugger;
          this.messagesofuserclicked.push(message);
        },
        error => {
          console.log(error)
        }
      );
      this.scrollToBottom();
    });
    this.scrollToBottom();
  }
  ngAfterViewInit() {
    this.scrollToBottom();
  }
  //when change group
  getMessages(groupid: number): Message[] {
    if (this.allmessages) {
      //get messages of user selected
      this.messagesofuserclicked = this.allmessages.filter(message => (message.user.id == groupid || message.recipient.user.id == groupid));
      this.messagesofuserclicked.forEach(mes => {
        //me sender
        if (mes.user.id == this.userconnecte.id) {
          mes.sender = "me";
        } else {
          mes.sender = "other";
        }
        mes.delivered = false;
        mes.read = false;
        mes.systemNotify = false;
      })
    }
    return this.messagesofuserclicked;
  }
  scrollToBottom(): void {
    try {
      console.log("scrollToBottom");
      this.myScrollContainer.nativeElement.scrollIntoView({ behavior: "smooth" });
    } catch (err) { }
  }
}
export interface GroupMessage {
  group: {
    groupName: string,
    creationDate: string;
    messages: Message[]
  }
}
