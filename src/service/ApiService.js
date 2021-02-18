import axios from "axios";

const API_URL = 'http://localhost:8080/';

export const ApiService = () => {

  return {
    login: (userid, password, callBack) => {
      const reqBody = {
        userid,
        password
      }
      axios.post('http://localhost:8080/authenticate', reqBody)
        .then(response => {
          if (response.data.token) {
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
  
    update: async (user) => {
      return axios.post('http://localhost:8080/user/update', user)
    },
  
    getUser: async (userid) => {
      return axios.get(`http://localhost:8080/user/${userid}`)
    },
  
    isLoggedIn: () => {
      return this.loggedIn;
    }

  }


}

// export default new ApiService();