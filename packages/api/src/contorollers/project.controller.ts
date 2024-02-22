import { NextFunction } from 'express';
import ProjectService from '../services/project.service';
import { Request, Response } from 'express';
import { IProject } from '../models/project';

class ProjectController {
  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await ProjectService.getById(req.params.id);
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const projects = await ProjectService.getAll();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const p = req.body as IProject;
      p.createdBy = (req as any).auth.name;
      p.updatedBy = (req as any).auth.name;
      const project = await ProjectService.create(p);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const p = req.body as IProject;
      p.updatedBy = (req as any).auth.name;
      const project = await ProjectService.update(p);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      await ProjectService.deleteById(req.params.id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectController();
