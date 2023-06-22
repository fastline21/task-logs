import { Schema, model, models } from 'mongoose';

const UsersSchema = new Schema({
	email_address: {
		type: String,
		required: [true, 'Email Address is required'],
	},
	username: {
		type: String,
		required: [true, 'Username is required'],
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

UsersSchema.set('toJSON', { virtuals: true });

const Users = models.Users || model('Users', UsersSchema);

export default Users;
