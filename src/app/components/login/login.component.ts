import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '../../services/authentication.service';
import { AppUsersService } from '../../services/appusers.service';
import { AppUser, Login } from '../../models/AppUsers';

@Component({
    selector: 'login'
    , templateUrl: 'login.component.html'
    , providers: [
        AuthenticationService
        , AppUsersService
        , NzMessageService
    ]
    , styles: [
        `
        ::ng-deep .cdk-overlay-container{
            z-index: 1200; 
            }
        ::ng-deep .anticon {
            margin-bottom: .25rem!important;
            vertical-align: middle!important;
        }   
        `
    ]
})

export class LoginComponent implements OnInit {

    public LogUser: Login = new Login();
    public UserData: AppUser = new AppUser();
    public loginForm!: FormGroup;
    public isLoading!: boolean;

    constructor(
        private TitleSVC: Title
        , private FB: FormBuilder
        , private AuthSVC: AuthenticationService
        , private AppUsersSVC: AppUsersService
        , private MessageSVC: NzMessageService
        , private router: Router
    ) { 
        this.TitleSVC.setTitle('System Control Report - Login')
        this.UserData = this.AuthSVC.currentUserValue;
        if(this.UserData.UserID > 0) {
            this.ForHomePage();
        }
    }

    ngOnInit() {
        this.loginForm = this.FB.group({
            UserName: ['',Validators.required]
            , Password: ['', Validators.required]
        })
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.isLoading = true;

        this.LogUser.UserName = this.f.UserName.value;
        this.LogUser.Password = this.f.Password.value;

        this.AuthSVC.login(this.LogUser).subscribe(
            res => {
                if(res){
                    this.UserData = res;
                    //localStorage.setItem('AppUser', JSON.stringify(this.UserData));
                    this.ForHomePage();
                }
            }, error => {
                console.log(error);
                if(error.status == 401)
                    {
                        //window.alert('The username or password is incorrect');
                        this.MessageSVC.error('The username or password is incorrect');
                        this.isLoading = false;
                    }
                    else
                    {
                        //window.alert("User doesn't have access to this application");
                        this.MessageSVC.warning("User doesn't have access to this application");
                        this.isLoading = false;
                    }
            }
        );
    }  

    ForHomePage(): void {
        this.router.navigate(['/Home']);
    }

}