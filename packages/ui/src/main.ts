import { enableProdMode, importProvidersFrom } from '@angular/core';
import { AppConfig, APP_CONF, AUTH_CONFIG } from './app/types';
import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/app/app.component';
import { provideRouter, withRouterConfig } from '@angular/router';
import { APP_ROUTES } from './app/routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

if (environment.production) {
    enableProdMode();
}

// first load the app config, then bootstrap the application
// provide the app config to the app as AUTH_CONFIG
fetch('/assets/app.config.json')
    .then((response) => response.json())
    .then((config: AppConfig) => {
        bootstrapApplication(AppComponent, {
            providers: [
                importProvidersFrom(
                    BrowserModule
                    // MaterialModule, etc
                ),
                provideAnimations(),
                provideHttpClient(withInterceptorsFromDi()),
                provideRouter(APP_ROUTES, withRouterConfig({ onSameUrlNavigation: 'reload' })),
                { provide: APP_CONF, useValue: config },
                {
                    provide: AUTH_CONFIG,
                    useFactory: (appConfig: AppConfig) => {
                        return appConfig.auth;
                    },
                    deps: [APP_CONF],
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ],
        });
    });
