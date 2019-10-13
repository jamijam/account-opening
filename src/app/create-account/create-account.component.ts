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

            let accountDetails = {
              accountIdentification: this.account.accountIdentification,
              partyId: partyDetails.partyId,
              accountName: accountData.accountName,
              nickname: accountData.nickname,
              schemeName: accountData.schemeName,
              secondaryIdentification: accountData.secondaryIdentification
            }

            localStorage.setItem('accountDetails', JSON.stringify(accountDetails));

            this.message = 'Your account has been successfully created.';

            document.getElementById('closeBtn').click();

            this.router.navigate(['/viewdetails']);
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
