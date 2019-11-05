import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../Email.service';
import { Email } from '../Email';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sent-mail',
  templateUrl: './sent-mail.component.html',
  styleUrls: ['./sent-mail.component.css']
})
export class SentMailComponent implements OnInit {

  public emailList: Email[];
  public emailDetails: Email;
  currentUser: User;
  
  constructor(
    private api: EmailService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { 
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        //this.router.navigate(['/']);
      }else{
        this.router.navigate(['/login']);
      }

    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.GetEmailOutbox()
  }

  GetEmailOutbox(): void {
    let userId = +this.currentUser.id;//+this.route.snapshot.paramMap.get('userId');

    this.api.GetEmailOutbox(userId)
      .subscribe(hero => this.emailList = hero);
  }
}

