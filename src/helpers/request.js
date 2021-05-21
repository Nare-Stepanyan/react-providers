function request(url, method = "GET", body) {
  const config = {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "origin",
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return fetch(url, config)
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        throw response.error;
      }

      return response;
    });
}
export default request;
