import mongoose from 'mongoose';

const floorPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Floor plan title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    type: {
      type: String,
      required: [true, 'Floor plan type is required'],
      enum: [
        '2 BHK Executive',
        '3 BHK Luxury Residence',
        '4 BHK Presidential Suite',
        'Duplex Penthouse',
        'Signature Sky Villa',
        'Corporate Office Floor'
      ],
      default: '3 BHK Luxury Residence'
    },
    bedrooms: {
      type: Number,
      required: [true, 'Bedrooms count is required'],
      min: [1, 'At least 1 bedroom']
    },
    bathrooms: {
      type: Number,
      required: [true, 'Bathrooms count is required'],
      min: [1, 'At least 1 bathroom']
    },
    balconies: {
      type: Number,
      default: 2
    },
    areaSqFt: {
      type: Number,
      required: [true, 'Area in Sq.Ft. is required'],
      min: [200, 'Minimum 200 sq.ft.']
    },
    carpetAreaSqFt: {
      type: Number,
      default: null
    },
    priceRange: {
      type: String,
      default: 'Price on Request'
    },
    imageUrl: {
      type: String,
      required: [true, 'Floor plan blueprint/render image is required']
    },
    pdfUrl: {
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
    features: [
      {
        type: String,
        trim: true
      }
    ],
    displayOrder: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.FloorPlan || mongoose.model('FloorPlan', floorPlanSchema);
