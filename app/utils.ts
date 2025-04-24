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

function getPrice(
  checkIn: string,
  checkOut: string,
  priceA: number,
  priceB: number
) {
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Define the date ranges for the current year
  const dateRanges = [
    {
      start: new Date(`${currentYear}-12-20`),
      end: new Date(`${currentYear + 1}-01-07`),
    }, // diciembre 20 - enero 7 (next year)
    {
      start: new Date(`${currentYear}-04-14`),
      end: new Date(`${currentYear}-04-25`),
    }, // abril 14 - abril 25
    {
      start: new Date(`${currentYear}-06-15`),
      end: new Date(`${currentYear}-08-15`),
    }, // junio 15 - agosto 15
  ];

  // Convert checkIn and checkOut to Date objects
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  // Check if both dates fall within any of the ranges
  const isWithinRange = dateRanges.some((range) => {
    return checkInDate >= range.start && checkOutDate <= range.end;
  });

  // Return the appropriate price
  return isWithinRange ? priceA : priceB;
}

export { getPrice, checkDatePrice };
