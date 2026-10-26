import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Luxury Residential', 'Ultra-Luxury Villa', 'Commercial Complex', 'Penthouse Collection', 'Integrated Township', 'High-Rise Tower'],
      default: 'Luxury Residential'
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Upcoming', 'Ongoing', 'Completed'],
      default: 'Ongoing'
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear()
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    description: {
      type: String,
      required: [true, 'Project description is required']
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required']
    },
    gallery: [
      {
        url: { type: String, required: true },
        caption: { type: String, default: '' },
        displayOrder: { type: Number, default: 0 }
      }
    ],
    amenities: [
      {
        type: String,
        trim: true
      }
    ],
    statistics: {
      bedrooms: { type: String, default: '3 & 4 BHK' },
      bathrooms: { type: String, default: '3 - 5' },
      areaSqFt: { type: String, default: '2,400 - 5,200 sq.ft.' },
      totalUnits: { type: String, default: '64' },
      floors: { type: String, default: 'G + 24' },
      possessionDate: { type: String, default: 'Dec 2026' }
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ],
    priceRange: {
      type: String,
      default: 'Price on Request'
    },
    featured: {
      type: Boolean,
      default: false
    },
    displayOrder: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Slug auto-generation fallback helper
projectSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
