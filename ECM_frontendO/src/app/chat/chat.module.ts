import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserImageComponent } from './user-image/user-image.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GroupListComponent } from './group-list/group-list.component';
import { MessageComponent } from './message/message.component';
import { GroupMessagesComponent } from './group-messages/group-messages.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { TextinputBarComponent } from './textinput-bar/textinput-bar.component';
import { ChatRoutingModule } from './chat-routing.module';
import { StartComponent } from './start/start.component';
// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AvatarModule } from 'ngx-avatar';
library.add(fas, far, fab);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    ChatRoutingModule, AvatarModule 
  ],
  declarations: [ChatComponent, UserImageComponent, GroupListComponent, MessageComponent, GroupMessagesComponent, TextinputBarComponent, StartComponent],
  exports: [ChatComponent],
  providers: []
})
export class ChatModule { 
  
}