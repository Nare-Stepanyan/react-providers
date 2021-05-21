function request(url, method = "GET", body) {
  const config = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":
        "https://awesome-wilson-059c3e.netlify.app",
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
