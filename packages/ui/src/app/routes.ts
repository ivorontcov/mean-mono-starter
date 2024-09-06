import { Routes } from '@angular/router';
// import { loadRemoteModule } from '@angular-architects/native-federation';
import { WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
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
    // {
    //     path: 'visualizer',
    //     loadComponent: () =>
    //       loadRemoteModule('mfe1', './web-components').then((m) => m.AppComponent),
    //   },
    {
        path: 'visualizer',
        component: WebComponentWrapper,
        data: {
            type: 'script',
            remoteEntry: 'http://localhost:4204/remoteEntry.js',
            remoteName: 'reactChild',
            exposedModule: './web-components',
            elementName: 'child-react-element',
        } as WebComponentWrapperOptions,
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
