import fetchTimeout from "fetch-timeout";
import { url } from "inspector";
import URL from "./Url";
import { access } from "fs";
export default class Client {
  request = (url: string) => {
    return fetchTimeout(
      url,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      },
      5000,
      "My custom timeout error string"
    )
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Status code not OK :" + res.status);
        } else {
          return res.json();
        }
      })
      .then(json => {
        console.log("json returned from response");
      })
      .catch(err => {
        console.log("error", err);
      });
  };
}

