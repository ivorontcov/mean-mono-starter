import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from 'oidc-client-ts';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    standalone: true,
    imports: [RouterModule],
})
export class AppComponent {
    constructor(private authService: AuthService) {
        if (environment.noauth) {
            this.authService.user$.next({
                profile: {
                    given_name: 'No',
                    family_name: 'Auth',
                },
                id_token: 'noauth',
            } as User);
        }
    }
}
