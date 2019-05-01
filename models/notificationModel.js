const mongoose = require("mongoose");
const keys = require("../configs/keys_dev");

const notificationSchema = mongoose.Schema({
  type: {
    type: String
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  recipients: [
    new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      isSeen: {
        type: Boolean,
        default: false
      },
      seenAt: {
        type: Date()
      }
    })
  ]
});

const notificationModel = mongoose.model("Notification", notificationSchema);

module.exports = notificationModel;
