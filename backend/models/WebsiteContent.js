import mongoose from 'mongoose';

const websiteContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      enum: ['hero', 'about', 'contact', 'banners', 'seo']
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    lastUpdatedBy: {
      type: String,
      default: 'Admin'
    }
  },
  { timestamps: true }
);

export default mongoose.models.WebsiteContent || mongoose.model('WebsiteContent', websiteContentSchema);
