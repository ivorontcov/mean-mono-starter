import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Project } from '@example/common';
import { ProjectService } from 'src/app/services/project.service';
import { DemoInnerComponent } from '../demo-inner/demo-inner.component';

@Component({
    selector: 'app-project',
    standalone: true,
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss',
    imports: [JsonPipe, RouterLink, DemoInnerComponent],
})
export class ProjectComponent {
    protected project!: Project;

    constructor(
        route: ActivatedRoute,
        private projectService: ProjectService
    ) {
        const pid = route.snapshot.params['pid'];
        this.projectService.getOne(pid).subscribe((project) => {
            this.project = project;
        });
    }
}
