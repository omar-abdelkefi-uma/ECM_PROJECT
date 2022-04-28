import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imagesuser: string[] = [];
  imageid: string = "";
  constructor() { }
}
