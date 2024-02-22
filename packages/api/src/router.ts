import express from 'express';
import ProjectController from './contorollers/project.controller';

export default express
  .Router()
  .get('/projects', ProjectController.getAll)
  .post('/projects', ProjectController.create)
  .put('/projects', ProjectController.update)
  .get('/projects/:id', ProjectController.getById)
  .delete('/projects/:id', ProjectController.deleteById);
