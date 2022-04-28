import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/message/chat.service';
@Component({
  selector: 'vng-chat-textinput-bar',
  templateUrl: './textinput-bar.component.html',
  styleUrls: ['./textinput-bar.component.css']
})
export class TextinputBarComponent implements OnInit {
  constructor(private chatService: ChatService) { }
  public textMessage: string = '';
  ngOnInit() {
  }
  sendMessage(text: string) {
    this.chatService.sendMessage(text).then(send => {
      if (send) {
        this.textMessage = null;
      }
    });
  }
}