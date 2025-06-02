import { Schema, model, models } from 'mongoose';
import Sources from './sources';
import Services from './services';

const TasksSchema = new Schema({
  task_date_start: {
    type: Date,
    required: [true, 'Task Date Start is required'],
  },
  task_date_end: {
    type: Date,
    required: [true, 'Task Date End is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  source_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'Source is required'],
  },
  service_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'Service is required'],
  },
  date_added: {
    type: Date,
    default: Date.now(),
  },
  date_modified: {
    type: Date,
    default: Date.now(),
  },
  date_deleted: {
    type: Date,
  },
});

TasksSchema.virtual('source', {
  ref: Sources,
  localField: 'source_id',
  foreignField: '_id',
  justOne: true,
});

TasksSchema.virtual('service', {
  ref: Services,
  localField: 'service_id',
  foreignField: '_id',
  justOne: true,
});

TasksSchema.set('toJSON', { virtuals: true });

const Tasks = models.Tasks || model('Tasks', TasksSchema);

export default Tasks;
