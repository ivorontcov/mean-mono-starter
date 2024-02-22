import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    standalone: true,
    imports: [],
})
export class LandingComponent {
    constructor(private authService: AuthService) {}

    login() {
        this.authService.login();
    }
}
