import { Schema, model, HydratedDocument } from 'mongoose';
import { Model } from 'mongoose';
import { join } from 'path';
import fs from 'fs-extra'

const { Types: { String, ObjectId, Number, Boolean } } = Schema

interface IMedia {
    path: string,
    createdAt: Date
    updatedAt: Date
}

export interface MediaMethods {

}

export interface MediaModel extends Model<IMedia, {}, MediaMethods> {
    register(file: Express.Multer.File): Promise<MediaDocument>
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

MediaSchema.static('register', async function (file: Express.Multer.File) {
    const destinationDir = join(process.cwd(), 'public', 'upload');
    const fileName = Date.now() + '_' + file.originalname
    const destinationFilePath = join(destinationDir, fileName)
    try {
        const authorizedMimetypes = {
            'image/png': true,
            'image/jpg': true,
        }
        if (!authorizedMimetypes[file.mimetype]) {
            throw new Error(`Unauthorized file type ${file.mimetype}, authorized types are ${Object.keys(authorizedMimetypes).join(', ')}`)
        }
        await fs.ensureDir(destinationDir);
        await fs.move(file.path, destinationFilePath)
        const media = new Media({
            path: fileName
        })
        return await media.save();
    } catch (error) {
        fs.existsSync(file.path) && await fs.remove(file.path)
        fs.existsSync(destinationFilePath) && await fs.remove(destinationFilePath)
        throw new Error(error.message)
    }

})

export const Media = model<IMedia, MediaModel>('Media', MediaSchema);