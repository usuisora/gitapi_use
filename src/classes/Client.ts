import fetchTimeout from "../lib/fetch-timeout";

export default class Client {
  headers: {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "request"
    }
  }
  request(url: string, delay: number = 5000) {
    return fetchTimeout(
      url,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "User-Agent": "request"
        }
      },
      delay,
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
        console.log("request every " + delay * 0.001 + " seconds");
        return json;
      })
      .catch(err => {
        console.log(err)
      });
  }

  async request2(url: string, delay: number = 5000){
    let  response = await fetchTimeout(
      'https://httpstat.us/200?sleep=1000',
      { headers: { Accept: 'application/json' } },
      delay
    )
      .then(response => response.json())
      .then(json => {
        console.log(`This will never log out: ${json}`)
      })
      .catch(error => {
        console.error(error.message)
      })
  }
}


