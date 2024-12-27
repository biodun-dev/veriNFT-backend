import mongoose, { Schema, Document } from 'mongoose';

export interface IBookmark extends Document {
  userId: string;
  contractAddress: string;
  tokenId: string;
  addedAt: Date;
}

const bookmarkSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contractAddress: { type: String, required: true },
  tokenId: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema);

export default Bookmark;
