export function processPhoneNumber(phoneNumber: string): string {
  let cleanedNumber = phoneNumber.replace(/\D/g, "");

  if (cleanedNumber.startsWith("0")) {
    cleanedNumber = "62" + cleanedNumber.slice(1);
  }

  if (cleanedNumber.startsWith("62")) {
    cleanedNumber = cleanedNumber;
  } else if (cleanedNumber.startsWith("0")) {
    cleanedNumber = "62" + cleanedNumber.slice(1);
  }

  return `${cleanedNumber}@c.us`;
}

