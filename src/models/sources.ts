import { Schema, model, models } from 'mongoose';

const SourcesSchema = new Schema({
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

SourcesSchema.set('toJSON', { virtuals: true });

const Sources = models.Sources || model('Sources', SourcesSchema);

export default Sources;
