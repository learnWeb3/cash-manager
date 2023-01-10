import { Schema, model, HydratedDocument } from "mongoose";
import { Model } from "mongoose";

const {
  Types: { String, ObjectId, Number, Boolean },
} = Schema;

interface IMedia {
  filename: string;
  key: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaMethods {}

export interface MediaModel extends Model<IMedia, {}, MediaMethods> {
  register(filename: string): Promise<MediaDocument>;
}

export interface MediaVirtuals {}
export type MediaDocument = HydratedDocument<
  IMedia,
  MediaMethods,
  MediaVirtuals
>;

const MediaSchema = new Schema<
  IMedia,
  MediaModel,
  MediaMethods,
  {},
  MediaVirtuals
>(
  {
    filename: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

MediaSchema.static("register", async function (filename: string) {
  try {
    const media = new Media({
      filename,
    });
    return await media.save();
  } catch (error) {
    throw new Error(error.message);
  }
});

export const Media = model<IMedia, MediaModel>("Media", MediaSchema);
