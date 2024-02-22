import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '@example/common';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [RouterLink],
})
export class HomeComponent {
    protected projects: Project[] = [];

    constructor(private projectService: ProjectService) {
        this.projectService.getAll().subscribe((projects: Project[]) => {
            this.projects = projects;
        });
    }
}
