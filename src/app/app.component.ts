import { Component } from '@angular/core';
import { EmailService } from './Email.service'
import { Email } from './Email';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Email';
  public emailList: Email[];
  public emailDetails: Email;

  IsVisibleEmailMain:boolean=true;
  IsVisibleLogin:boolean=false;
  currentURL='';

  constructor(
    location: Location,
    private api: EmailService,
    private route: ActivatedRoute,
    private rte:Router
    ) {
    this.currentURL = location.path();
    }

  ngOnInit(){
    if(this.currentURL.indexOf('login')>-1){
      this.IsVisibleLogin=true; this.IsVisibleEmailMain=false;
    }else{
      this.IsVisibleEmailMain=true; this.IsVisibleLogin=false;
    }
  }

  // getProducts(){
  //   this.api.getProducts().subscribe(res => {
  //     this.emailList = res;
  //   });
  // }

  // getusers() {
  //   //debugger;
  //   this.api.getProducts().subscribe((data: any[])=>{
  //     //debugger;
  //     console.log(data);
  //     this.emailList = data;
  //   }) 

    // this.api.getUsers()
    // .subscribe(data => {
    //   for (const d of (data as any)) {
    //     this.email.push({
    //       FromEmail: d.FromEmail,
    //       Name: d.Name,
    //       Id: d.Id
    //     });
    //   }
    //   console.log(this.email);
    // });
  //}

}
