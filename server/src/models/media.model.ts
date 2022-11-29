import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IMedia {
    path: string
}

export interface MediaMethods {

}

export interface MediaModel extends Model<IMedia, {}, MediaMethods> {

}

export type MediaDocument = HydratedDocument<IMedia, {}, MediaMethods>

const MediaSchema = new Schema<IMedia, MediaModel, MediaMethods>({
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

export const Media = model<IMedia, MediaModel>('Media', MediaSchema);