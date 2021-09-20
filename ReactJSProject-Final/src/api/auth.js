import axios from 'axios';

const baseUrl = '/api/v1/';

export const signup = async ({path, data}) => {
    try {
        return await axios.post(`${baseUrl}${path}`, data);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const login = async ({path, accessToken}) => {
    try {
        return await axios.post(`${baseUrl}${path}`, {}, {
            headers: {
                'Authorization': accessToken
            },
        });
    } catch(e) {
        console.log(e);
        throw e;
    }
}