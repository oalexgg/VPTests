import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class GalleryService {
    allImages: Array<any>;

    constructor(
       public storage: Storage) {
        this.allImages = [];
        this.storage.get('src').then((value) => {
            if(value != null){
                var routeImage = value.split(',');
                for (var i of routeImage) {
                    if(i != '' && i != null){
                        this.allImages.push({'src': i});
                    }
                }
            }
            else {
                this.allImages = [];
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

    deleteImage(i) {
        this.allImages.splice(i,1);
        this.storage.clear().then(() => {
            console.log("storage cleared");
        });
        var images ="";
        for (var j of this.allImages) {
            if ( j.src != null) {
                 images = images + ',' + j.src;
            }
        }

        this.storage.set('src', images)

        this.storage.get('src').then((images) => {
            this.setAllImages(images.src);
        });
    }
}
