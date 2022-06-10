import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://shisha-journey-backend.herokuapp.com/api/shops/';

class UserService {

  getAllShopsData() {
    return axios.get(API_URL + 'getAllShopsData', { headers: authHeader() });
  }

  createOneShop() {
    //TODO
    return axios.post(API_URL + 'createOneShop', { headers: authHeader() });
  }
  
}

export default new UserService();