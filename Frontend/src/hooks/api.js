
const hostname = 'http://localhost:8000'
const options = {
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
    },
  };


export const loginUser = (credencials) => {

        return fetch (hostname + "/login/", {
          method: "POST",
          body: JSON.stringify(credencials),
          ...options,
        })
          .then((response) => response.json())
          .then((response) => {
            return response;
          });
  };