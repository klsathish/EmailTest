import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../Email.service'
import { Email } from '../Email';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';


@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  mailForm: FormGroup;
  public emailList: Email[];
  public emailDetails: Email;
  submitted = false;
  param:any;
  currentUser: User;

  constructor(
    private api: EmailService,
    private formBuilder: FormBuilder,
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
    this.mailForm = this.formBuilder.group({
      To: ['', [Validators.required,Validators.email]],
      CC:['', Validators.email],
      Subject: ['', Validators.required],
      Body: ['', Validators.required],
  });
  }

     // convenience getter for easy access to form fields
     get f() { return this.mailForm.controls; }


  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.mailForm.invalid) {
          return;
      }
      
      let formValues = this.mailForm.value;
      let param :any={
        FromEmail:  this.currentUser.email,
        Body:formValues.Body,
        ToEmail:formValues.To,
        Subject:formValues.Subject
      }
      this.api.ComposeEmail(param);
      //debugger;
      this.router.navigate(['/SentMail']);
  }



  
 


}
