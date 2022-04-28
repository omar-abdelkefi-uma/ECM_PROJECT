import { Component, Input } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Group } from '../group-list/group-list.component';
import { User } from 'src/app/models/user/user';
@Component({
  selector: 'vng-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ChatComponent {
  public activeGroup: User;
  @Input() showUserList: boolean = true;
  @Input() userListCollapsed: boolean = false;
  public currentGroupActions: GroupAction[] = [
    { icon: ['fas', 'user-plus'] },
    { icon: ['fas', 'pencil-alt'] },
    { icon: ['fas', 'phone'], active: false },
    { icon: ['fas', 'video'], active: false },
    { icon: ['fas', 'info'], active: false },
    { icon: ['fas', 'users-cog'], active: false },
  ]
  constructor() {
    console.log(this.activeGroup);
  }
}
export interface GroupAction {
  name?: string,
  icon: string[],
  active?: boolean
}
// <button class="btn">
//   <fa-icon [icon]="['fas','user-plus']"></fa-icon>
// </button>
// <button class="btn">
//   <fa-icon [icon]="['fas','pencil-alt']"></fa-icon>
// </button>
// <button class="btn disabled">
//   <fa-icon [icon]="['fas','phone']"></fa-icon>
// </button>
// <button class="btn disabled">
//   <fa-icon [icon]="['fas','video']"></fa-icon>
// </button>
// <button class="btn">
//   <fa-icon [icon]="['fas','info']"></fa-icon>
// </button>
// <button class="btn">
//   <fa-icon [icon]="['fas','users-cog']"></fa-icon>
// </button>