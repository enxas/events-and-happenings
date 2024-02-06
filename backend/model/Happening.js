import mongoose from 'mongoose';

const { Schema } = mongoose;

const happeningSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
	place: {
        type: String,
        required: true
    },
	city: {
        type: String,
        required: true
    },
	address: {
        type: String,
        required: true
    },
	startsAt: {
        type: Date,
        required: true
    },
	thumbnail: {
        type: String,
        required: true
    },
	user_id: {
        type: Schema.Types.ObjectId,
		ref: 'User',
        required: true
    },
});

export default mongoose.model('Happening', happeningSchema);