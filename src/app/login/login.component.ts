import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { hypervergeResponse } from '../_models/hypervergeResponse';

import { FaceMatchService } from '../_services/face-match.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  image1;
  image2;

  APIXToken: string;

  verified: boolean = false;
  confidence: number;

  constructor(private faceMatchService: FaceMatchService, private router: Router) { }

  ngOnInit() {
    this.faceMatchService.getAPIXToken().subscribe(data => {
      this.APIXToken = data.access_token;
    })
  }

  onFile1Selected(event) {
    this.image1 = event.target.files[0];
  }

  onFile2Selected(event) {
    this.image2 = event.target.files[0];
  }

  verifyUser() {
    this.faceMatchService.verifyUser(this.APIXToken, this.image1, this.image2)
      .subscribe(data => {

        let receivedObject: hypervergeResponse = JSON.parse(JSON.stringify(data));

        if (receivedObject.result.match == "yes") {
          this.verified = true;
          this.confidence = receivedObject.result.conf;
          this.loadImage(this.image1, "image1");
          this.loadImage(this.image2, "image2");          
          // setTimeout(() => {
          //   this.router.navigateByUrl('/createaccount');
          // }, 3000);
        }
      });
  }

  loadImage(image: any, imgTagId: string) {
    let reader = new FileReader();

    var imgtag: any = document.getElementById(imgTagId);
    imgtag.title = image.name;

    reader.onload = function (event) {
      imgtag.src = (<any>event.target).result as string;
    };

    reader.readAsDataURL(image);
  }

}
