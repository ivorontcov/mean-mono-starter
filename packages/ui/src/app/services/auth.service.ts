import { Inject, Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client-ts';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { AuthConfig, AUTH_CONFIG } from '../types';
import { environment } from 'src/environments/environment';

const AuthKeys = {
    AuthScopeDefault: 'openid profile offline_access email tenant identity_provider',
    CodeFlowUrlPattern: '?code=',
    ImplicitFlowUrlPattern: '#id_token',
};

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userManager!: UserManager;
    private authConfig: AuthConfig;
    private window!: Window;
    public user$ = new BehaviorSubject<User | undefined>(undefined);
    public get isLoggedIn(): boolean {
        return !!this.user$.value;
    }

    constructor(
        @Inject(DOCUMENT) document: Document,
        @Inject(AUTH_CONFIG) configuration: AuthConfig,
        private router: Router
    ) {
        this.window = document.defaultView!;
        this.authConfig = configuration;

        const settings: UserManagerSettings = {
            authority: this.authConfig.authority,
            client_id: this.authConfig.clientId!,
            redirect_uri: this.authConfig.redirectUrl || location?.origin,
            scope: this.authConfig.scope || AuthKeys.AuthScopeDefault,
            post_logout_redirect_uri: this.authConfig.postLogoutRedirectUrl || location.origin,
            accessTokenExpiringNotificationTimeInSeconds: this.authConfig.accessTokenExpiringNotificationTimeInSeconds || 60,
        };
        this.userManager = new UserManager(settings);

        this.userManager.events.addAccessTokenExpiring(() => {
            // todo: check inactivity and show alert
        });
    }

    public async login() {
        await this.userManager.clearStaleState();
        await this.userManager.signinRedirect();
    }

    public async logout() {
        await this.userManager.clearStaleState();
        const signOutOptions: { client_id?: string } = {};

        if (this.authConfig.clientId) {
            signOutOptions.client_id = this.authConfig.clientId;
        }

        return this.userManager.signoutRedirect().catch((err) => {
            throw new Error('could not log out: ' + err);
        });
    }

    public endSession(): void {
        this.userManager
            .removeUser()
            .then(() => {
                this.user$.next(undefined);
            })
            .catch((err) => {
                throw new Error('could not end session: ' + err);
            });
    }

    public handleError(error: HttpErrorResponse) {
        const status = typeof error.status === 'string' ? parseInt(error.status, 10) : error.status;
        if (status === 403) {
            const accessDeniedRoute = this.authConfig.forbiddenRoute || this.authConfig.accessDeniedRoute;

            if (accessDeniedRoute) {
                this.router.navigate([accessDeniedRoute]);
                return;
            }

            throw error;
        } else if (status === 401) {
            this.endSession();
            this.login();
        }
    }

    public async checkAuthCallback(): Promise<void> {
        // Skip auth callback if noauth is enabled, very specific to this project
        if (environment.noauth) {
            return;
        }

        const urlResponse = this.window.location.href;
        const currentUser = await this.userManager.getUser();
        this.user$.next(currentUser || undefined);

        // Skip some landing page url and only process authorization enpoint
        if (!this.isValidCodeFlowUri(urlResponse) && !this.isValidImplicitFlowUri(urlResponse)) {
            return;
        }

        const user = await this.userManager.signinRedirectCallback(urlResponse).catch((err) => {
            throw new Error('auth callback failed: ' + err);
        });

        // Remove the code from the url, clear the history state, and redirect to the root
        window.history.replaceState({}, window.document.title, window.location.origin + window.location.pathname);

        this.user$.next(user);
    }

    private isValidImplicitFlowUri(url: string): boolean {
        return url.indexOf(this.userManager.settings.redirect_uri as string) > -1 && url.indexOf(AuthKeys.ImplicitFlowUrlPattern) > -1;
    }

    private isValidCodeFlowUri(url: string): boolean {
        return url.indexOf(this.userManager.settings.redirect_uri as string) > -1 && url.indexOf(AuthKeys.CodeFlowUrlPattern) > -1;
    }
}
