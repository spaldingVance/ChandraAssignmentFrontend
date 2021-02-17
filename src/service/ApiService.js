import axios from "axios";

const API_URL = 'http://localhost:8080/';

export const ApiService = () => {

  return {
    login: (userid, password, callBack) => {
      const reqBody = {
        userid,
        password
      }
      console.log("Request Body: ");
      console.log(reqBody);
      axios.post('http://localhost:8080/authenticate', reqBody)
        .then(response => {
          console.log("RESPONSE: ");
          console.log(response);
          if (response.data.token) {
            // this.setState({loggedIn: true})
            console.log("TOKEN: " + response.data.token);
            console.log("USER: " + JSON.stringify(response.data));
            localStorage.setItem("user", JSON.stringify(response.data));
            localStorage.setItem("jwt", response.data.token);
            callBack(response)
            return;
          }
        })
        .catch(err => {
          console.log(err);
          return null;
        })

    },
  
    logout: () => {
      localStorage.removeItem("user");
    },
  
    register: async (userid, password, name, age, role) => {
      console.log(userid);
      axios.post('http://localhost:8080/authenticate/new', {
        userid,
        password,
        name,
        age,
        role
      })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("jwt", response.data.token);
          }
        })
        .catch(err => {
          console.log(err);
          return null
        })
    },
  
    update: async (userid, password, name, age, role) => {
      console.log(userid);
      axios.put('http://localhost:8080/user/update', {
        userid,
        password,
        name,
        age,
        role
      })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("jwt", response.data.token);
          }
        })
        .catch(err => {
          console.log(err);
          return null
        })
    },
  
    getUser: async (userid) => {
      axios.get(`http://localhost:8080/user/${userid}`)
        .then(response => {
          console.log("Get User Response: ");
          console.log(response);
          if (response.data) {
            return response.data;
          } else {
            return null;
          }
        })
        .catch(err => {
          console.log("ERROR");
          console.log(err);
          return null
        })
    },
  
    isLoggedIn: () => {
      return this.loggedIn;
    }

  }


}

// export default new ApiService();