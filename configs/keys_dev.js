module.exports = {
  USER_ROLES: {
    SIMPLE: "SIMPLE",
    ADMIN: "ADMIN",
    BLOGER: "BLOGER"
  },
  TOKEN_TYPES: {
    ACCOUNT_ACTIVATION: "ACCOUNT_ACTIVATION",
    RESET_PASSWORD: "RESET_PASSWORD"
  },
  JWT_SECRET: "JWT_SECRET",
  SALT_VALUE: 10,
  MONGODB_CONNEXTION: "mongodb://localhost:27017/ieee_esprit",
  // "mongodb+srv://admin:admin@ehr-roxao.mongodb.net/ehr?retryWrites=true",

  EMAIL: {
    GMAIL_CONFIGURATIONS: {
      EMAIL_ADRESSE: "your email address",
      EMAIL_PASSWORD: "your password",
      EMAIL_SERVICE: "gmail"
    },
    EMAIL_REASON: {
      ACCOUNT_ACTIVATION: "ACCOUNT_ACTIVATION",
      ACCOUNT_ACTIVATION_BLOGER: "ACCOUNT_ACTIVATION_BLOGER",
      ACCOUNT_ACTIVATION_ADMIN: "ACCOUNT_ACTIVATION_ADMIN",
      RESET_PASSWORD: "RESET_PASSWORD"
    }
  }
};
