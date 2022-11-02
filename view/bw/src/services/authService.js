import axios from "axios";

const API_URL = 'http://localhost:7070/'



const update = (_id,picture, age, eyeColor, first, last, company, email, password, phone, address)=> {
  var userToken = JSON.parse(localStorage.getItem('user')).token 
  return axios.put(API_URL + "users/"+_id, {
      picture, age, eyeColor, name:{first, last}, company, email, password, phone, address
    }, {
      
      headers: {
       "Authorization": "Bearer " + userToken
      }
    }).then(async (response) => {
      let userData = await axios.get(API_URL + "users/"+_id, {
        headers: {
         "Authorization": "Bearer " + userToken
        }})
        
        localStorage.setItem("user", JSON.stringify({"token":userToken, "user":userData.data, "message":"User Updated Successfully"}));
        return userData;

    }).catch(function (error) {
      console.log(error);
    })
};


const register = (picture, age, eyeColor, first, last, company, email, password, phone, address)=> {
    return axios.post(API_URL + "signup", {
        picture, age, eyeColor, name:{first, last}, company, email, password, phone, address
      }).then((response) => {
        return response       
      }).catch(function (error) {
        console.log(error);
      })
  };


const login = (email, password) => {
   return  axios.post(API_URL + "login", {
       email: email,
        password: password,
      }).then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
       
      }).catch(function (error) {
        console.log(error);
      });;
  };
  const logout = () => {
    localStorage.removeItem("user");
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    update
  };
  
  export default AuthService;