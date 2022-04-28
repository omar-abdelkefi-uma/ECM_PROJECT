import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message/Message';


@Component({
  selector: 'vng-chat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

  constructor() { }

  @Input() message: Message;

  ngOnInit() {
  }

}

