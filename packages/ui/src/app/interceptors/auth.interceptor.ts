import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (environment.noauth) {
            return next.handle(req);
        }

        const request = this.addAuthenticationToken(req);
        return next.handle(request).pipe(
            catchError((error) => {
                console.error('Error occured while making request', error);
                this.authService.handleError(error);
                return throwError(error);
            })
        );
    }

    private addAuthenticationToken(req: HttpRequest<unknown>) {
        const token = this.authService.user$.value?.id_token;
        if (!token) {
            return req;
        }
        const header = `Bearer ${token}`;
        const headers = req.headers.set('Authorization', header);
        return req.clone({ headers });
    }
}
