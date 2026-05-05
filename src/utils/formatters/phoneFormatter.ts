export const formatPhoneNumber = (phone: string | number): string => {
  const phoneStr = String(phone);

  // Already has leading 0
  if (phoneStr.startsWith('0')) {
    return phoneStr;
  }

  // Add leading 0 for 10-digit numbers
  if (phoneStr.length === 10) {
    return `0${phoneStr}`;
  }

  // Return as-is if format is unknown
  return phoneStr;
};
