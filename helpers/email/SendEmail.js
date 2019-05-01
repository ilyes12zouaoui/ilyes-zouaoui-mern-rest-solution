const nodemailer = require("nodemailer");
const inscriptionConfirmationTemplate = require("./templetes/accountActivationTemplate");
const resetPasswordTemplate = require("./templetes/resetPasswordTemplate");
const keys = require("../../configs/keys_dev");

const produceEmailData = (user, token, EMAIL_REASON) => {
  let emailData = {
    from:
      "ilyes zouaoui MERN stack " +
      keys.EMAIL.GMAIL_CONFIGURATIONS.EMAIL_ADRESSE,
    to: user.email,
    subject: "",
    html: ""
  };
  if (EMAIL_REASON == keys.EMAIL.EMAIL_REASON.ACCOUNT_ACTIVATION) {
    emailData.subject = "Inscription Confirmation ilyes zouaoui MERN stack";
    emailData.html = inscriptionConfirmationTemplate(user.firstName, token);
  } else if (EMAIL_REASON == keys.EMAIL.EMAIL_REASON.RESET_PASSWORD) {
    emailData.subject = "Reset password ilyes zouaoui MERN stack";
    emailData.html = resetPasswordTemplate(user.firstName, user._id, token);
  }
  return emailData;
};

function sendEmail(user, token, EMAIL_REASON) {
  const emailData = produceEmailData(user, token, EMAIL_REASON);

  let transporter = nodemailer.createTransport({
    service: keys.EMAIL.GMAIL_CONFIGURATIONS.EMAIL_SERVICE,
    auth: {
      user: keys.EMAIL.GMAIL_CONFIGURATIONS.EMAIL_ADRESSE,
      pass: keys.EMAIL.GMAIL_CONFIGURATIONS.EMAIL_PASSWORD
    }
  });

  transporter.sendMail(emailData, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = sendEmail;
