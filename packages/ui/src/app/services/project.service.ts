import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONF } from '../types';
import { Project } from '@example/common';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private baseUrl = '';

    constructor(
        private http: HttpClient,
        @Inject(APP_CONF) config: AppConfig
    ) {
        this.baseUrl = config.backend.baseUrl + '/projects';
    }

    getOne(id: string) {
        return this.http.get<Project>(this.baseUrl + '/' + id);
    }

    getAll() {
        return this.http.get<Project[]>(this.baseUrl);
    }

    update(project: Project) {
        return this.http.put<Project>(this.baseUrl, project);
    }

    create(project: Partial<Project>) {
        return this.http.post<Project>(this.baseUrl, project);
    }

    deleteById(id: string) {
        return this.http.delete<Project>(this.baseUrl + '/' + id);
    }
}
