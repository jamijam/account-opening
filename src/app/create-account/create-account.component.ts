import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  schemes: any = ["BBAN","IBAN"];
  account;
  message = "Please fill all fields"
  accountCreated:boolean = false;
  accountInfo = "";

  accountJson = {
    "accountClosingDate": "2019-01-20T12:21:50.659Z",
    "accountCurrency": "USD",
    "accountName": "",
    "accountOpeningDate": "2019-01-20T12:21:50.659Z",
    "accountTypeId": 1001,
    "accountrefnumber": "string",
    "balance": 0,
    "bankId": 1001,
    "branchId": 1000001,
    "cardFacility": "Y",
    "checkerDate": "2019-01-20T12:21:50.659Z",
    "checkerId": "string",
    "chequebookFacility": "Y",
    "creditDebitIndicator": "Credit",
    "creditLineAmount": 0,
    "creditLineIncluded": "N",
    "creditLineType": "Emergency",
    "frozen": "Y",
    "isjointaccount": "N",
    "isonlineaccessenabled": "Y",
    "makerDate": "2019-01-20T12:21:50.659Z",
    "makerId": "string",
    "modifiedDate": "2019-01-20T12:21:50.659Z",
    "nickname": "",
    "noCredit": "Y",
    "noDebit": "N",
    "nomineeAddress": "string",
    "nomineeDob": "2019-01-20T12:21:50.659Z",
    "nomineeName": "string",
    "nomineePhoneNo": "string",
    "nomineeRelatonship": "string",
    "passbookFacility": "Y",
    "productId": 1001,
    "schemeName": "IBAN",
    "status": "string",
    "typeOfBalance": "ClosingAvailable",
    "usage": "Y"
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  marked = false;

  cardFacility(event) {
    this.marked = event.target.checked;

    if (this.marked == true) {
      this.accountJson.cardFacility = "Y";
    }
    else {
      this.accountJson.cardFacility = "N";
    }
  }

  onOptionsSelected(event) {
    this.accountJson.schemeName = this.schemes[event];
    console.log(this.accountJson);
  }

  getAccountvalues() {

    let boo = true;

    if (this.accountJson.accountName === '') {
      console.log("Account name cannot be empty");
      boo = false;
    }

    if (this.accountJson.nickname === '') {
      console.log("Nickname cannot be empty");
      boo = false;
    }

    if (this.accountJson.bankId === 0) {
      console.log("Bank not selected");
      boo = false;
    }

    if (boo === true) {

      this.message = "Creating..."

      let httpObject = { "method": "createAccount", "account": this.accountJson };
      this.http.post('https://57bojam407.execute-api.eu-central-1.amazonaws.com/prod/afindemo', httpObject).subscribe(data => {

        this.account = JSON.parse(JSON.stringify(data));
        console.log(data);

        if (data != null) {
          this.message = "Account Successfully Created."
          this.accountInfo = "Your Account Number : " + this.account.accountIdentification;
          this.accountCreated = true;
          
          console.log(data);
        } else {
          this.message = "Account Creation Failed";
        }
      }
      );
    }
  }

  gotoView() {

    this.router.navigateByUrl('/viewaccount');

  }


}

export class banksResponse {
  content: {};
}

export class createAccountResponse {
  accountIdentification: string;
}
