import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Image title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Exterior Architecture',
        'Interior Living',
        'Landscape & Grounds',
        'Masterplan',
        'Penthouses & Terraces',
        'Construction Progress'
      ],
      default: 'Exterior Architecture'
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL or file path is required']
    },
    thumbnailUrl: {
      type: String,
      default: ''
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      default: null
    },
    projectName: {
      type: String,
      default: ''
    },
    displayOrder: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema);
