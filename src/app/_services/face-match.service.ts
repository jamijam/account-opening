import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as hardcoded from 'src/assets/hardcoded/hardcoded-dev.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceMatchService {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'appId': hardcoded.facematch.apiCredentials.appId,
      'appKey': hardcoded.facematch.apiCredentials.appKey
    })
  };

  constructor(private http: HttpClient) { }

  getAPIXToken(): Observable<any> {
    const apixOptions = {
      headers: new HttpHeaders({
        "Accept": "*/*",
        "Content-Type": "application/json"
      })
    };

    const request = JSON.stringify(hardcoded.facematch.apixCredentials);

    return this.http.post(hardcoded.facematch.apixTokenUrl, request, apixOptions);
  }

  verifyUser(APIXToken, image1, image2): Observable<any> {
    let headers: HttpHeaders = this.httpOptions.headers.set('X-Authorization', 'bearer ' + APIXToken);

    let formData: FormData = new FormData();
    formData.append('type', 'id')
    formData.append('image1', image1);
    formData.append('image2', image2);

    return this.http.post(hardcoded.facematch.verifyUrl, formData, { headers });
  }
}
