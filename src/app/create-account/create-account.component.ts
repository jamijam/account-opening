import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SmartBankService } from "../_services/smart-bank/smart-bank.service";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  schemes: any = ['BBAN', 'IBAN'];
  account;
  message = 'Please fill all fields';
  message2;
  accountCreated = false;
  accountInfo = '';

  accountCardFacility: string = 'N';
  schemeName: string;
  accountName: string;
  nickname: string;

  marked = false;
  APIXToken: string;

  constructor(private smartBankService: SmartBankService, private router: Router) { }

  ngOnInit() {
    this.smartBankService.getAPIXToken().subscribe(data => {
      this.APIXToken = data.access_token;
    })
  }

  cardFacility(event) {
    this.marked = event.target.checked;

    if (this.marked === true) {
      this.accountCardFacility = 'Y';
    } else {
      this.accountCardFacility = 'N';
    }
  }

  onOptionsSelected(event) {
    this.schemeName = this.schemes[event];
    console.log(this.schemeName);
  }

  getAccountValues() {
    this.message = 'Creating...';

    this.smartBankService.createAccount(
      this.APIXToken,
      this.accountName,
      this.nickname,
      this.schemeName,
      this.accountCardFacility
    ).subscribe(accountData => {
      this.account = JSON.parse(JSON.stringify(accountData));

      if (accountData != null) {
        this.smartBankService.createParty(this.APIXToken, this.accountName).subscribe(partyData => {
          let partyId = partyData.partyId;
          let accountId = accountData.accountId;
  
          this.smartBankService.setOwner(this.APIXToken, accountId, partyId).subscribe(response => {
            let partyDetails = response.party;

            this.message = 'Your account has been successfully created.';
            this.message2 = 'A mail from Model Bank has been sent to verify your identity and provide further information.'
            this.accountInfo = 'Account Number : ' + this.account.accountIdentification + '<br>'
                              + 'Personal ID: ' + partyDetails.partyId + '<br>'
                              + 'Account Name: ' + accountData.accountName + ' | ' + accountData.nickname + ' (nickname)<br>'
                              + 'Account Scheme: ' + accountData.schemeName + '<br>'
                              + 'Secondary Identification: ' + accountData.secondaryIdentification;
            this.accountCreated = true;            
          });
        });

        console.log(accountData);
      } else {
        this.message = 'Account Creation Failed';
      }
    });
  }

  checkDisabled(): boolean {
    if (this.accountName && this.accountCardFacility && this.schemeName && this.nickname) {
      return false;
    };
    return true;
  }

}

export class BanksResponse {
  content: {};
}

export class CreateAccountResponse {
  accountIdentification: string;
}
