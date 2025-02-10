const sendEmail = () => {
  Email.send({
    SecureToken: "C973D7AD-F097-4B95-91F4-40ABC5567812", // Replace with your secure token
    To: "recipient@example.com",
    From: "you@example.com",
    Subject: "Test Email",
    Body: "This is a test email sent from Next.js using SmtpJS.",
  }).then((message) => alert(message));
};
