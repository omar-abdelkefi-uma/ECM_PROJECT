import { ChangeDetectorRef, ElementRef, Inject, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image as Alias } from 'src/app/models/user/image';
import { Society } from 'src/app/models/user/society';
export interface DialogData {
  microse: Society
}
@Component({
  selector: 'app-edit-society',
  templateUrl: './edit-society.component.html',
  styleUrls: ['./edit-society.component.css']
})
export class EditSocietyComponent implements OnInit {
  society: Society;
  constructor(public fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cd: ChangeDetectorRef, public dialogRef: MatDialogRef<EditSocietyComponent>) {
  }
  //Nom
  FormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
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
  //tel
  TelControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern('[0-9]{8}')
  ]);
  FaxControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern('[0-9]{8}')
  ]);
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.society = new Society();
    this.society.fax = this.data.microse.fax;
    this.society.logo = this.data.microse.logo;
    this.society.id = this.data.microse.id;
    this.society.address = this.data.microse.address;
    this.society.city = this.data.microse.city;
    this.society.phone = this.data.microse.phone;
    this.society.name = this.data.microse.name;
    this.society.postalCode = this.data.microse.postalCode;
    this.society.email = this.data.microse.email;
    this.cardImageBase64 = 'data:image/jpg;base64,' + this.society.logo.imageid;
  }
  /*########################## File Upload ########################*/
  @ViewChild('fileInput') el: ElementRef;
  cardImageBase64: string;
  imageError: string;
  isImageSaved: boolean;
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            this.society.logo = new Alias();
            this.society.logo.imageid = this.cardImageBase64.substring(23);
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
