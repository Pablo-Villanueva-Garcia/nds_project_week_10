
const hostname = 'http://localhost:8000'
const options = {
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json",
    },
  };


export const loginUser = async (credencials) => {

        return fetch (hostname + "/login/", {
          method: "POST",
          mode:'cors',
          body: JSON.stringify(credencials),
          ...options,
        })
          .then((response) => response.json())
          .then((response) => {
            return response;
          });
  };