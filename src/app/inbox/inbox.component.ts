import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../Email.service';
import { Email } from '../Email';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public emailList: Email[];
  public emailDetails: Email;
  currentUser: User;
  
  constructor(
    private api: EmailService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { 
    //debugger;
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        //this.router.navigate(['/']);
      }else{
        this.router.navigate(['/login']);
      }

    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.GetEmailInbox()
  }

  GetEmailInbox(): void {
    //debugger;
    let userId = +this.currentUser.id;//+this.route.snapshot.paramMap.get('userId');

    this.api.GetEmailInbox(userId)
      .subscribe(hero =>{
        //debugger;
        this.emailList = hero
      } );
  }

  btnCompose(id:number){
    //debugger;
    this.api.changeEmailId(id)
    this.router.navigate(['emailmain']);
  }
}
