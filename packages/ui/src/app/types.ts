import { InjectionToken } from '@angular/core';

export interface AuthConfig {
    authority: string;
    clientId?: string;
    clientSecret?: string;
    organization?: string;
    scope?: string;
    redirectUrl?: string;
    // allows silent renew - it should be true when no login page is created
    automaticSilentRenew?: boolean;
    // redirect url after logout, required if logout method is called
    postLogoutRedirectUrl?: string;
    // redirect route after forbidden
    accessDeniedRoute?: string;
    // Deprecated alias for "accessDeniedRoute". Use "accessDeniedRoute" instead.
    forbiddenRoute?: string;
    accessTokenExpiringNotificationTimeInSeconds?: number;
}

export interface BackendConfig {
    baseUrl: string;
}

export interface AppConfig {
    auth: AuthConfig;
    backend: BackendConfig;
}

export const APP_CONF = new InjectionToken<AppConfig>('example.workflow.app.config');
export const AUTH_CONFIG = new InjectionToken<AuthConfig>('example.auth.config');
