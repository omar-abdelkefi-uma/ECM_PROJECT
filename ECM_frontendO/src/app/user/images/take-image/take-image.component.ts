import { Component, Input, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Card } from 'src/app/models/user/card';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { ImageService } from 'src/app/services/user/image.service';
import { Image as Alias } from '@ks89/angular-modal-gallery';
import { GridLayout, PlainGalleryStrategy, PlainGalleryConfig } from '@ks89/angular-modal-gallery';
import { Image as card } from 'src/app/models/user/image';
import { User } from 'src/app/models/user/user';
@Component({
  selector: 'app-take-image',
  templateUrl: './take-image.component.html',
  styleUrls: ['./take-image.component.scss']
})
export class TakeImageComponent implements OnInit {
  // toggle webcam on/off
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  // latest snapshot
  public webcamImage: WebcamImage = null;
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  imagesRect: Alias[] = [];
  imagese: Alias[] = [];
  img: Alias;
  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '48%', height: '100px' }, { length: 2, wrap: false })
  };
  administrator: User = new User();
  id: number;
  images: card[] = [];
  i: number;
  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
    this.id = this.route.snapshot.params['id'];
    this.i = 0;
    this.userservice.getuser(this.id).subscribe(data => {
      debugger;
      this.administrator = data;
      this.images = this.administrator.images;
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
  /*******************methods webcam */
  //take a snapshot
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    const buttons = document.querySelectorAll('.btn-floating');
    buttons.forEach((el: any) => {
      this.renderer.removeClass(el, 'btn-floating');
      //distance between controle
      this.renderer.addClass(el, 'px-3');
      //lenght
      this.renderer.addClass(el.firstElementChild, 'fa-3x');
    });
    this.card = new Card();
    this.card.img = webcamImage.imageAsDataUrl;
    this.cards.push(this.card);
    this.slides = this.chunk(this.cards, 3);
    this.imageservice.imagesuser.push(this.card.img.substring(23))
    this.index = this.index + 1;
  }
  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  /********************************************************************** */
  chunk(arr: any, chunkSize: number) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  cards: Card[] = [];
  card: Card;
  slides: any = [[]];
  resize: boolean = false;
  zoom: string;
  public captures: Array<any>;
  index: number;
  zoomout(img) {
    this.zoom = img;
    this.resize = true;
  }
  zoomin() {
    this.resize = false;
  }
  remove(img) {
    this.cards.forEach((item, index) => {
      if (item.img === img) {
        this.cards.splice(index, 1);
        this.imageservice.imagesuser.splice(index, 1);
      }
    });
    this.slides = this.chunk(this.cards, 3);
  }
  constructor(private route: ActivatedRoute, private userservice: UserService, private router: Router, private renderer: Renderer2, private zone: NgZone, private personservice: UserService, private imageservice: ImageService) {
    this.captures = [];
  }
  handleError(error) {
    console.log('Error: ', error);
  }
  files: any[] = [];
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }
  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }
  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }
  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            //progress
            this.files[index].progress += 100;
          }
        }, 200);
      }
    }, 1000);
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    this.fileChangeEvent(files);
    for (const item of files) {
      item.progress = 0;
      this.files.splice(0, 1)
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }
  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  cardImageBase64: string;
  imageError: string;
  isImageSaved: boolean;
  fileChangeEvent(fileInput: any) {
    debugger;
    this.imageError = null;
    if (fileInput && fileInput[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput[0].size > max_size) {
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
            const buttons = document.querySelectorAll('.btn-floating');
            buttons.forEach((el: any) => {
              this.renderer.removeClass(el, 'btn-floating');
              //distance between controle
              this.renderer.addClass(el, 'px-3');
              //lenght
              this.renderer.addClass(el.firstElementChild, 'fa-3x');
            });
            this.card = new Card();
            this.card.img = this.cardImageBase64;
            this.cards.push(this.card);
            this.slides = this.chunk(this.cards, 3);
            this.imageservice.imagesuser.push(this.card.img.substring(23));
          }
        };
      };
      reader.readAsDataURL(fileInput[0]);
    }
  }
  @Input() imagee: string;
}
