import axios from "axios";
import authHeader from "../services/authHeader";

const API_URL = 'http://localhost:7070/';



const getUser = (id) => {
  return axios.get(API_URL + "users/"+ id, { headers: authHeader() });
};



const UserService = {
getUser
};

export default UserService;