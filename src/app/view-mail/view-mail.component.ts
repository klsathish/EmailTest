import { Component, OnInit } from '@angular/core';
import { EmailService } from '../Email.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { Email } from '../Email';

@Component({
  selector: 'app-view-mail',
  templateUrl: './view-mail.component.html',
  styleUrls: ['./view-mail.component.css']
})
export class ViewMailComponent implements OnInit {
  currentUser:User;
  public emailList: Email[];
  public emailDetails: Email;

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
    debugger;
    let isViewMail = this.api.getEmailId();

    let param :any={
      UserId:this.currentUser.id,
      Id:isViewMail
    }

    this.api.ReadUserMail(param).subscribe(
      user=>{
        this.emailDetails=user;
      })
  }

}
