import { Document, Model, Schema, model } from 'mongoose';
import { Project as TProject } from '@example/common';

export interface IProject extends TProject, Document {}

interface IProjectModel extends Model<IProject> {}

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    driver: { type: String },
    environment: { type: String },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: 'Project',
  }
);

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

export const Project = model<IProject, IProjectModel>('Project', schema);
