import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { checkAuth } from './guards/check-auth';
import { ProjectComponent } from './components/project/project.component';

export const APP_ROUTES: Routes = [
    {
        path: 'project/:pid',
        component: ProjectComponent,
        canActivate: [checkAuth],
    },
    {
        path: 'workflows',
        component: HomeComponent,
        canActivate: [checkAuth],
    },
    {
        path: 'landing',
        canActivate: [checkAuth],
        component: LandingComponent,
    },
    {
        path: '',
        redirectTo: '/landing',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '/landing',
        pathMatch: 'full',
    },
];
