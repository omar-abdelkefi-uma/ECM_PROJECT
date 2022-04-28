import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'vng-chat-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  constructor(private storageservice: StorageService, private userservice: UserService) { }
  @Output() activeGroupChanged = new EventEmitter<User>()
  public groups: User[];
  public activeGroup: User;
  userconnecte: User = new User();
  selectedItem = 0;
  ngOnInit() {
    this.userconnecte = this.storageservice.getuserfromcookieorsession();
    this.userservice.getuserList().subscribe(
      data => {
        this.groups = data.filter(admin => admin.id != this.userconnecte.id);
        this.activateGroup(this.groups[0], null);
      }
    )
    /*this.groups = this.chatService.getGroups();
    this.groups.then(groups => {
      debugger;
      this.activateGroup(groups[0]);
    })*/
  }
  activateGroup(group: User, i) {
    if (i) {
      this.selectedItem = i;
    }
    this.activeGroup = group;
    //emit to chat component
    this.activeGroupChanged.emit(this.activeGroup);
  }
}
export interface Group {
  groupName: string, groupImageUrl: string, lastMessage: string
}
