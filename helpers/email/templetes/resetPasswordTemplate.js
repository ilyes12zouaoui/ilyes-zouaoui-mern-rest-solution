const resetPasswordTemplate = (userName, userId, token) => {
  return `
  <!DOCTYPE html>
  <html style="margin:0;padding:0">
    <head> </head>
    <body>
    <h1 style="color: lightskyblue" Welcome to ilyes zouaoui MERN stack solution</h1>
    <p>
    welcome ${userName} , in ording to reset your password please click the link below
      </p>
      <a href="http://localhost:3000/resetPassword/${token}">click</a>
    </body>
  </html>  
    `;
};

module.exports = resetPasswordTemplate;
