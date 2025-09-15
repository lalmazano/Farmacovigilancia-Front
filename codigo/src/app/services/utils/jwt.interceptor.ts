import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs'; 
import { environment } from 'src/environments/environment';
import { AuthenticacionService } from './authenticacion.service';
import { LoadingSpinnerService } from '../loading-spinner.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticacionService, private loadingSpinner:LoadingSpinnerService) {}
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.UserValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
          if (this.tokenExpired(user.token ?? '')) {
            // role not authorised so redirect to home page
             this.authenticationService.logOut();
          }
            request = request.clone({             
                setHeaders: {
                  'Content-Type':'application/json',
                  'Access-Control-Allow-Origin':request.url,
                  'Authorization': `Bearer ${user.token}`,
                  'Usuario': user.username,
                  // 'Accept-Encoding' : 'gzip'
                }
            });
        }
        this.loadingSpinner.addLoading()
    return next.handle(request)
        .pipe(
          tap(val=>{
            setTimeout(() => {
              this.loadingSpinner.removeLoading();
              }, 250);
          }),
          catchError((err) => {
            setTimeout(() => {
              this.loadingSpinner.removeLoading();
              }, 250);
            throw err;
          }
          ),
        );
  }
}