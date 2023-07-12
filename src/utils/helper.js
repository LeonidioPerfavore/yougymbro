import axios from 'axios';

export const getInstanceAxios = (headers) => {
    return axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            ...headers
}
    });
};