const inscriptionConfirmationTemplate = (userName, token) => {
  return `
  <!DOCTYPE html>
  <html style="margin:0;padding:0">
    <head> </head>
    <body>
    <h1 style="color: lightskyblue"> Welcome to ilyes zouaoui MERN stack solution</h1>
    <p>
        welcome ${userName} , in ording to activate your
        account please click the link below
      </p>
      <a href="http://localhost:3000/accountActivation/${token}">click</a>
    </body>
  </html>  
    `;
};

module.exports = inscriptionConfirmationTemplate;
