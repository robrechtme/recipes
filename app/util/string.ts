export const capitalize = (value: string) => {
  if (value.length === 0) {
    return value;
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const hostNameFromUrl = (url: string) => {
  let hostname: string;
  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }
  hostname = hostname.split(":")[0];
  hostname = hostname.split("?")[0];
  return hostname.replace("www.", "");
};
