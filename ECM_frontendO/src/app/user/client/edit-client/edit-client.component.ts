import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/user/role';
import { RoleService } from 'src/app/services/user/role.service';
import { Image as Alias } from '@ks89/angular-modal-gallery';
import { GridLayout, PlainGalleryStrategy, PlainGalleryConfig } from '@ks89/angular-modal-gallery';
import { Image } from 'src/app/models/user/image';
import { Document } from 'src/app/models/user/document';
import { Configuration } from '../../../configuration';
import { Experience } from 'src/app/models/user/experience';
import { Client } from 'src/app/models/user/client';
import { ClientService } from 'src/app/services/user/client.service';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  isLinear = false;
  client: Client = new Client();
  roles: Role[];
  id: number;
  RoleSelectedValue: number;
  documents: Document[];
  urlServer: string;
  experiences: Experience[];
  constructor(private route: ActivatedRoute, private clientservice: ClientService, private roleservice: RoleService, private router: Router, private _formBuilder: FormBuilder) {
    7
  }
  ngOnInit(): void {
    this.urlServer = Configuration.server;
    this.reloadData();
  }
  images: Image[] = [];
  i: number;
  imagesRect: Alias[] = [];
  imagese: Alias[] = [];
  img: Alias;
  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '48%', height: '100px' }, { length: 2, wrap: false })
  };
  reloadData() {
    this.roleservice.getRolesList()
      .subscribe(data => { this.roles = data; });
    this.id = this.route.snapshot.params['id'];
    this.i = 0;
    this.clientservice.getClient(this.id).subscribe(data => {
      this.client = data;
      this.documents = this.client.documents;
      this.RoleSelectedValue = data.role.id;
      this.images = this.client.images;
      this.images.forEach(img => {
        this.i = this.i + 1;
        this.img = new Alias(
          this.i,
          { // modal
            img: 'data:image/jpg;base64,' + img.imageid
          });
        this.imagesRect.push(this.img);
      })
      debugger;
      this.imagese = this.imagesRect;
    });
  }
  update() {
    //donner role id pour la personn
    this.roles.forEach(role => {
      //RoleSelectedValue ==>le nom du role selected
      if (role.id == this.RoleSelectedValue) {
        //il suffit do donner role id du role choisit 
        this.client.role = role;
      }
    });
    debugger;
    this.clientservice.updateClient(this.client).subscribe(
      data => this.router.navigate(["/alluser/client"]),
      error => console.log(error)
    );
  }
  //Nom
  fullnameControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //date
  startDate = new Date(1970, 0, 1);
  startexp = new Date(2018, 0, 1);
  //Function to testdate
  testDate(dateofb) {
    var timeDiff = Math.abs(Date.now() - dateofb);
    if (Math.floor((timeDiff / (1000 * 3600 * 24)) / 365) < 20) {
      return true;
    }
    else {
      return false;
    }
  }
  dateControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //lieu
  lieuControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //sexe
  sexe = [
    { value: 'Femme', viewValue: 'F' },
    { value: 'Homme', viewValue: 'H' },
  ];
  sexeControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //CIN
  cinControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern('[0-9]{8}')
  ]);
  //username
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  //tel
  TelControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern('[0-9]{8}')
  ]);
  //Ville
  villeControl = new FormControl();
  villeGroups = [
    {
      name: 'Tunisia',
      ville: [
        { value: 'Tunis', viewValue: 'Tunis' },
        { value: 'Sfax', viewValue: 'Sfax' },
        { value: 'Gabes', viewValue: 'Gabes' },
        { value: 'Gafsa', viewValue: 'Gafsa' },
        { value: 'Sousse', viewValue: 'Sousse' }
      ]
    },
    {
      name: 'France',
      ville: [
        { value: 'Paris', viewValue: 'Paris' },
        { value: 'Lille', viewValue: 'Lille' },
        { value: 'Lyon', viewValue: 'Lyon' }
      ]
    },
    {
      name: 'Espagne',
      ville: [
        { value: 'Madrid', viewValue: 'Madrid' },
        { value: 'Barcelona', viewValue: 'Barcelona' },
        { value: 'Las Palmas', viewValue: 'Las Palmas' }
      ]
    },
  ];
  roleFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  addimage() {
    this.router.navigate(['/alluser/addimage', this.client.id], { queryParams: { type: "client" } });
  }
}
