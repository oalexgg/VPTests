import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class GalleryService {
    allImages: Array<any>;

    constructor(
       public storage: Storage) {
        this.allImages = [];
        this.storage.get('src').then((value) => {
            var routeImage = value.split(',');
            for (var i of routeImage) {
                if(i != "null"){
                    this.allImages.push({'src': i});
                }
            }
        });

    }

    getAllImages(){
        return this.allImages;
    }

    setAllImages(allImages) {
        for (var i of allImages) {
            if(i != "null") {
             this.allImages.push({'src': i.src});   
            }
        }
    }
}
