const sendEmail = () => {
  Email.send({
    SecureToken: "C973D7AD-F097-4B95-91F4-40ABC5567812", // Replace with your secure token
    To: "recipient@example.com",
    From: "you@example.com",
    Subject: "Test Email",
    Body: "This is a test email sent from Next.js using SmtpJS.",
  }).then((message) => alert(message));
};

function checkDatePrice(priceA: number, priceB: number) {
  const date = new Date(); // Get the current date

  // Define the date ranges
  const ranges = [
    {
      start: new Date(date.getFullYear(), 11, 5),
      end: new Date(date.getFullYear() + 1, 0, 7),
    }, // December 5 - January 7
    {
      start: new Date(date.getFullYear(), 3, 13),
      end: new Date(date.getFullYear(), 3, 19),
    }, // April 13 - April 19
    {
      start: new Date(date.getFullYear(), 5, 20),
      end: new Date(date.getFullYear(), 7, 20),
    }, // June 20 - August 20
  ];

  // Check if the current date falls within any of the ranges
  const isInRange = ranges.some(
    (range) => date >= range.start && date <= range.end
  );

  // Return the appropriate price
  return isInRange ? priceA : priceB;
}

export { sendEmail, checkDatePrice };
