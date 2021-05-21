// function request(url, method = "GET", body) {
//   const config = {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   if (body) {
//     config.body = JSON.stringify(body);
//   }
//   return fetch(url, config)
//     .then((res) => res.json())
//     .then((response) => {
//       if (response.error) {
//         throw response.error;
//       }

//       return response;
//     });
// }
// export default request;

function request(url, method = "GET", body) {
  const config = {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer",
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
