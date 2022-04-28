import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user/user';
@Component({
  selector: 'app-user-image',
  templateUrl: './user-image.component.html',
  styleUrls: ['./user-image.component.scss']
})
export class UserImageComponent implements OnInit {
  @Input() user: User;
  constructor() { }
  ngOnInit() {
    this.user.color="#adb639";
    this.user.status="online";
  }
}
/*export interface User {
  name: string;
  picture: string;
  status: 'online' | 'offline' | 'dnd' | 'absent'
  color: string;
}*/