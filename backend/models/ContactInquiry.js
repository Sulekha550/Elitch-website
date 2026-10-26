import mongoose from 'mongoose';

const contactInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    inquiry: {
      type: String,
      default: 'General Inquiry',
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'responded', 'archived', 'closed'],
      default: 'new'
    },
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    collection: 'contactinquiries'
  }
);

export default mongoose.models.ContactInquiry || mongoose.model('ContactInquiry', contactInquirySchema);
