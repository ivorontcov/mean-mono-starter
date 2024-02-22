import { IProject, Project } from '../models/project';

const MOCK_PROJECTS: any[] = [
  {
    id: '1',
    name: 'Mock Project 1',
    description: 'Description 1',
  },
  {
    id: '2',
    name: 'Mock Project 2',
    description: 'Description 2',
  },
  {
    id: '3',
    name: 'Mock Project 3',
    description: 'Description 3',
  },
];

class ProjectService {
  async getById(id: string) {
    // const project = await Project.findById(id);
    const project = MOCK_PROJECTS.find((p) => p.id === id);
    return project;
  }

  async getAll() {
    // const projects = await Project.find();
    const projects = MOCK_PROJECTS;
    return projects;
  }

  async create(project: IProject) {
    const p = new Project(project);
    const newProject = await Project.create(p);
    return newProject;
  }

  async update(project: IProject) {
    const newProject = await Project.findOneAndUpdate({ _id: project.id }, project, { new: true });
    return newProject;
  }

  async deleteById(id: string) {
    return await Project.deleteOne({ _id: id });
  }
}

export default new ProjectService();
