/** Translate ISO 8601 duration to hours and minutes */
export const translateTime = (time: string) => {
  const hours = time.match(/(\d+)H/)?.[1];
  const minutes = time.match(/(\d+)M/)?.[1];

  if (hours && minutes) {
    return `${hours}u ${minutes}m`;
  } else if (hours) {
    return `${hours}u`;
  } else if (minutes) {
    return `${minutes}m`;
  }
  return time;
};
