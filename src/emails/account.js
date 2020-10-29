const mailgun = require("mailgun-js");
const DOMAIN = "sandbox189e8c4764cc45989a49142858e559c8.mailgun.org";
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});
const sendWelcomeEmail = (email, name) => {
  mg.messages().send(
    {
      to: email,
      from: "vivekvarma15516@gmail.com",
      subject: "Welcome to the app",
      text: `Hello ${name}, I hope you enjoy using my app`,
    },
    function (error, body) {
      console.log({ error, body });
    }
  );
};
const sendCancellationEmail = (email, name) => {
  mg.messages().send(
    {
      to: email,
      from: "vivekvarma15516@gmail.com",
      subject: "Farewell",
      text: `Bye ${name}, I'm sorry to see you go`,
    },
    function (error, body) {
      console.log({ error, body });
    }
  );
};

module.exports = { sendWelcomeEmail, sendCancellationEmail };
