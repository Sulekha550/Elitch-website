import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true
    },
    entityType: {
      type: String,
      enum: ['PROJECT', 'LEAD', 'GALLERY', 'FLOORPLAN', 'CONTENT', 'AUTH', 'SETTINGS', 'CONTACT_INQUIRY', 'CONTACT'],
      required: true
    },
    entityId: {
      type: String,
      default: ''
    },
    details: {
      type: String,
      default: ''
    },
    adminEmail: {
      type: String,
      default: 'system'
    },
    ipAddress: {
      type: String,
      default: ''
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
