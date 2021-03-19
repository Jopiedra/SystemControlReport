import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Parameters } from '../../assets/parameters';
import { AppUser, Login } from '../models/AppUsers';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<AppUser>;
    public currentUser: Observable<AppUser>;
    public UserLoging: AppUser = new AppUser();

    constructor(private _http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<AppUser>(JSON.parse(localStorage.getItem('AppUser')|| '{}'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    // JSON.parse(localStorage.getItem('User'))
    
    public get currentUserValue(): AppUser {
        return this.currentUserSubject.value;
    }

    login(Model: Login) {

       //console.log(username, password, IP);
       
       const httpOptions = {
                headers: new HttpHeaders({
                    "Access-Control-Allow-Headers" : "Content-Type"
                    ,"content-type": "application/json"
                    ,"Access-Control-Allow-Origin": "*"
                    , "Authorization": "Basic " + btoa(Model.UserName + ":" + Model.Password)
                })
            }
    
        //console.log(httpOptions);
        
        return this._http.post(Parameters.hostname + '/AppUsers/Login',null, httpOptions)
            .pipe(
                map(
                    (user: any) => {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //user.TokenCreationDate = new Date().toUTCString();
                    
                    this.UserLoging = user;
                    this.UserLoging.TokenCreationDate = new Date().toString();
                    this.UserLoging.ActiveFlag = true;
                    localStorage.setItem('AppUser', JSON.stringify(this.UserLoging));
                    
                    this.currentUserSubject.next(this.UserLoging);
                    return this.UserLoging;
                    
                }), catchError( error => {
                    if(error.status == 401)
                    {
                        window.alert('El nombre de usuario o Contraseña es incorrecto.');
                    }
                    else
                    {
                        window.alert('El usuario aun no esta registrado.');
                    }
                    return throwError('Error');
                })
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('AppUser');
        this.currentUserSubject.next(JSON.parse('{}'));
    }    
}