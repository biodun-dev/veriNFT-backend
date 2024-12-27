import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  contractAddress: {
    type: String,
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
  authenticity: {
    type: String,
    required: true,
  },
  confidenceScore: {
    type: Number,
    required: true,
  },
  verifiedAt: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model('History', historySchema);

export default History;
