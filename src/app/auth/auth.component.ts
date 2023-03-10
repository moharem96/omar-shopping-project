// import { PlaceholderDirectivee } from './../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild  } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertComponeent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  // @ViewChild(PlaceholderDirectivee, {static: false}) alert: PlaceholderDirectivee

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>
    this.isLoading = true
    if(this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }
    authObs.subscribe(response => {
        console.log(response)
        this.isLoading = false
        this.router.navigate(['./recipes'])
      }, errorMessage => {

        console.log(errorMessage)
        this.error = errorMessage
        // this.showErrorAlert(errorMessage)
        this.isLoading = false
      })
    form.reset()
  }

  onHandleError() {
    this.error = null
  }
}
