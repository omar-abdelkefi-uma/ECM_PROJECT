import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { StorageService } from 'src/app/services/storage.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { Message } from 'src/app/models/message/Message';
import { ChatService } from 'src/app/services/message/chat.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user:User;
  mess:Message;
  constructor(private chatService: ChatService,private webSocketService: WebsocketService,private storageservice:StorageService, location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
    
    this.user= this.storageservice.getuserfromcookieorsession();
    let stompClient = this.webSocketService.connect();
    stompClient.connect( {"user" : this.user.fullname}, frame => {
      
     stompClient.subscribe('/user/'+this.user.fullname+'/queue/reply',
       message=> {
        debugger;
        //convert json string to object
        this.mess=JSON.parse(message.body);
        this.mess.delivered=true;
        this.mess.sender="other";
        this.mess.systemNotify=false;
        
        this.chatService.receiveMessage(this.mess);
         

      })

  });
    
    
  }

  ngOnInit() {
    
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.user= this.storageservice.getuserfromcookieorsession();
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }

    return 'Dashboard';
  }

}
