import ogs, { ErrorResult, SuccessResult } from "open-graph-scraper";

export default async function scrape(url: string) {
  return new Promise((resolve, reject) => {
    ogs({ url }, (isError, data) => {
      if (isError) {
        return reject(data.result as unknown as ErrorResult);
      } else {
        return resolve(data as unknown as SuccessResult["result"]);
      }
    });
  });
}
