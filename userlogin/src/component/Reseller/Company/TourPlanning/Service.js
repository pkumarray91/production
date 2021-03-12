import axios from 'axios';

const API_URL = 'http://140.238.84.255:8000';
export default class TourService{
   tour(user){
    const url = `${API_URL}/tour/planning`;
        return axios.post(url,user);
   };


}


