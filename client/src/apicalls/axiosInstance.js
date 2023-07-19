import axios from 'axios';
export const axiosInstance= axios.create({
    headers:{
        authorization: `Bearer ${localStorage.getItem('token')}` //standard way of sending the authorization token to the backend
    }
})