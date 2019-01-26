import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.scss']
})
export class ViewAccountComponent implements OnInit {

  accountNumber: String = "";
  invalid = false;
  accountAvailable = false;
  accountGot;

  accountModel = {
    accountNumber: "",
    accountName: "",
    SecondaryIdentificaton: "",
    nickName: "",
    schemeName: "",
    bankName: "",
    branchAddress: ""
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  getAccount() {
    console.log(this.accountNumber);

    this.invalid = false;

    if (this.accountNumber == "") {
      this.invalid = true;
    }
    else {

      let jsonObj = {
        "method": "getAccount",
        "accountNumber": this.accountNumber
      };


      this.http.post('https://57bojam407.execute-api.eu-central-1.amazonaws.com/prod/afindemo', jsonObj).subscribe(data => {

        if (data == null) {
          this.invalid = true;
        }

        this.accountGot = JSON.parse(JSON.stringify(data));
        console.log(this.accountGot);

        this.accountModel.accountNumber = this.accountGot.accountIdentification;
        this.accountModel.accountName = this.accountGot.accountName;
        this.accountModel.SecondaryIdentificaton = this.accountGot.secondaryIdentification;
        this.accountModel.schemeName = this.accountGot.schemeName;
        this.accountModel.bankName = this.accountGot.bank.bankName;
        this.accountModel.branchAddress = this.accountGot.branch.address;
        this.accountModel.nickName = this.accountGot.nickname;

        this.accountAvailable = true;

      });
    }
  }

  clear() {
    this.accountNumber = "";
    this.invalid = false;
    this.accountAvailable = false;

    this.accountModel.accountNumber = "";
    this.accountModel.accountName = "";
    this.accountModel.SecondaryIdentificaton = "";
    this.accountModel.schemeName = "";
    this.accountModel.bankName = "";
    this.accountModel.branchAddress = "";
    this.accountModel.nickName = "";
  }

}

export class accountResponse {

  accountIdentification: String;
  accountName: String;
  secondaryIdentification: String;
  nickname: String;
  schemeName: String;
  bank: {
    bankName: String;
  };
  branch: {
    address: String;
  }

}
