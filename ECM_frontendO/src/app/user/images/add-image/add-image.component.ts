import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/models/user/image';
import { User } from 'src/app/models/user/user';
import { ImageService } from 'src/app/services/user/image.service';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {
  constructor(private imageservice: ImageService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private _formBuilder: FormBuilder, private userservice: UserService) { }
  user: User = new User();
  id: number;
  typeuser: string;
  ngOnInit(): void {
    this.imageservice.imagesuser = [];
    this.route.queryParams.subscribe(params => {
      this.typeuser = params['type'];
    });
    this.id = this.route.snapshot.params['id'];
    this.userservice.getuser(this.id).subscribe(data => {
      debugger;
      this.user = data;
    });
  }
  imagesadded: string[] = [];
  imgesrecent: string[] = [];
  imagea: Image;
  addimage() {
    this.imagesadded = this.imageservice.imagesuser;
    this.imagesadded.forEach(img => {
      this.imagea = new Image();
      this.imagea.imageid = img;
      this.user.images.push(this.imagea);
    }
    );
    debugger;
    this.userservice.updateuser(this.user).subscribe(
      data => {
        if (this.typeuser == "admin") {
          this.router.navigate(['/alluser/editadministrator', this.user.id]);
        }
        if (this.typeuser == "client") {
          this.router.navigate(['/alluser/editclient', this.user.id]);
        }
        if (this.typeuser == "employee") {
          this.router.navigate(['/alluser/editemployee', this.user.id]);
        }
      },
      error => console.log(error)
    );
  }
  edit() {
    if (this.typeuser == "admin") {
      this.router.navigate(['/alluser/editadministrator', this.user.id]);
    }
    if (this.typeuser == "client") {
      this.router.navigate(['/alluser/editclient', this.user.id]);
    }
    if (this.typeuser == "employee") {
      this.router.navigate(['/alluser/editemployee', this.user.id]);
    }
  }
}
