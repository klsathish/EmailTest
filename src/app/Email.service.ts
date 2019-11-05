import { Injectable } from '@angular/core';
import { Observable, of,BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';
import { Email } from './Email';

@Injectable({ providedIn: 'root' })
export class EmailService {

    private currentEmailIdSubject: BehaviorSubject<number>;
    public currentEmailId: Observable<number>;

    email: Email[];
    baseUrl = 'http://localhost:51502/api/Email/';
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
         // 'Authorization': 'my-auth-token'
        })
      };
   
     
constructor(
    private emailService: EmailService,
    private http: HttpClient) { 
        this.currentEmailIdSubject = new BehaviorSubject<number>(JSON.parse(localStorage.getItem('currentEmailId')));
        this.currentEmailId = this.currentEmailIdSubject.asObservable();
        
}
getEmailId(): any{
    //debugger;
    return this.currentEmailIdSubject.value;
}

changeEmailId(id:number){
    //debugger;
    localStorage.setItem('currentEmailId', id.toString());
    this.currentEmailIdSubject.next(id);
}
ngOnInit(){
    //debugger;
    //this.currentEmailId = new BehaviorSubject<number>(0);
}

public getUsers(): Observable<Email[]> {
    return this.http.get<Email[]>(this.baseUrl+'GetUsers');
}

public GetEmailInbox(userId: number): Observable<Email[]> {
    const  params = new  HttpParams().set('userId', userId.toString());
    return this.http.get<Email[]>(this.baseUrl+'GetEmailInbox',{params});
}

public GetEmailOutbox(userId: number): Observable<Email[]> {
    const  params = new  HttpParams().set('userId',  userId.toString());
    return this.http.get<Email[]>(this.baseUrl+'GetEmailOutbox',{params});
}

public GetEmailTrash(userId: number): Observable<Email[]> {
    const  params = new  HttpParams().set('userId',  userId.toString());
    return this.http.get<Email[]>(this.baseUrl+'GetEmailTrash',{params});
}

public ComposeEmail(obj: Email){
    let body = JSON.stringify(obj);
    this.http.post((this.baseUrl+'ComposeEmail'), body, this.httpOptions).toPromise();
}

public UpdateDeleteMailIn(obj: Email) : Observable<Email[]> {
    let body = JSON.stringify(obj);
    return this.http.post<Email[]>(this.baseUrl+'UpdateDeleteMailIn', body, this.httpOptions);
}

public UpdateDeleteMailOut(obj: Email) : Observable<Email[]> {
    let body = JSON.stringify(obj);
    return this.http.post<Email[]>(this.baseUrl+'UpdateDeleteMailOut', body, this.httpOptions);
}

public ReadUserMail(obj: Email): Observable<Email> {
    let body = JSON.stringify(obj);
    return this.http.post<Email>(this.baseUrl+'ReadUserMail', body, this.httpOptions);
}

private handleError(error: Response) {
    return Observable.throw(error.statusText);
}

}

