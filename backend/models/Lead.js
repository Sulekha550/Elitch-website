import mongoose from 'mongoose';

const internalNoteSchema = new mongoose.Schema(
  {
    note: { type: String, required: true },
    author: { type: String, default: 'Administrator' },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    inquiryCategory: {
      type: String,
      default: 'Residential Investment',
      trim: true
    },
    message: {
      type: String,
      required: [true, 'Inquiry message is required'],
      trim: true
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Follow-up', 'Closed'],
      default: 'New'
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    preferredContactMethod: {
      type: String,
      default: 'WhatsApp'
    },
    submissionDate: {
      type: Date,
      default: Date.now
    },
    followUpDate: {
      type: Date,
      default: null
    },
    internalNotes: [internalNoteSchema],
    sourceProject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null
    }
  },
  { timestamps: true }
);

leadSchema.pre('validate', function (next) {
  if (this.sourceProject === '' || !this.sourceProject) {
    this.sourceProject = null;
  } else if (typeof this.sourceProject === 'string' && !mongoose.Types.ObjectId.isValid(this.sourceProject)) {
    this.sourceProject = null;
  }
  next();
});

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
