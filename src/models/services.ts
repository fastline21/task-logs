import { Schema, model, models } from 'mongoose';

const ServicesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  description: {
    type: String,
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

ServicesSchema.set('toJSON', { virtuals: true });

const Services = models.Services || model('Services', ServicesSchema);

export default Services;
