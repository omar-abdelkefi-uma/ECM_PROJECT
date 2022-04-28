import { Component, OnInit } from '@angular/core';
import { Recipient } from 'src/app/models/message/Recipient';
import { User } from 'src/app/models/user/user';
import { MessageService } from 'src/app/services/message/message.service';
import { RecipientService } from 'src/app/services/message/recipient.service';
import { StorageService } from 'src/app/services/storage.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import {Message} from '../../models/message/Message';
@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.scss']
})
export class DashboadComponent implements OnInit {
  permissions:string;
  message:Message=new Message();
  recipient:Recipient=new Recipient();
  //stompClient:any;
  constructor(private webSocketService: WebsocketService,private storageservice:StorageService,private messageservice:MessageService,private recipientservice:RecipientService) { 
   
  }
  userconnecte:User=new User();
  receivemessage:string;
  ngOnInit(): void {
    this.userconnecte=this.storageservice.getuserfromcookieorsession();
   // this.stompClient = this.webSocketService.connect();
 
   /* this.messageservice.getMessagesList().subscribe(
      data=>{
        debugger;
        console.log(data);
      }
    );*/
    

    /*this.recipient.user=new User();
    this.recipient.user=this.userconnecte;
    this.recipient.containgroup=false;
    this.message.user=new User();
    this.message.user.id=2;
    this.message.content="hello omar me messi";
    this.message.recipient=this.recipient;
    debugger;
    this.messageservice.createMessage(this.message).subscribe(
      data=>{
        debugger;
        console.log(data);
      },
      error=>{
        debugger;
        console.log(error)
      }
    )*/
    }
    touser:string;
  sendMessage(){
   debugger;
    //this.stompClient.send("/app/hello",{}, JSON.stringify({name:this.touser,toUser:this.touser}));
  }
}
