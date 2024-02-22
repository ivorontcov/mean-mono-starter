import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const checkAuth = async (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    await authService.checkAuthCallback();

    const loggedIn = authService.isLoggedIn;
    const isLanding = route.url[0].path === 'landing';
    const redirectFound = !!sessionStorage.getItem('redirectUrl');

    if (!loggedIn && !redirectFound) {
        sessionStorage.setItem('redirectUrl', location.pathname);
    }

    // if not logged in and not on landing page, redirect to landing page.
    if (!loggedIn && !isLanding) {
        return router.createUrlTree(['/landing']);
    }

    // if not logged in and on landing page, allow
    if (!loggedIn && isLanding) {
        return true;
    }

    // if logged in and on landing page, redirect to workflows page
    if (loggedIn && isLanding) {
        let redirectUrl = sessionStorage.getItem('redirectUrl');
        sessionStorage.removeItem('redirectUrl');
        if (!redirectUrl || redirectUrl === '/' || redirectUrl === '/landing' || redirectUrl === '/workflows') {
            redirectUrl = '/workflows';
        }
        return router.createUrlTree([redirectUrl]);
    }

    // if logged in and not on landing page, allow
    if (loggedIn && !isLanding) {
        sessionStorage.removeItem('redirectUrl');
        return true;
    }

    return true;
};
