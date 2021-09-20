import axios from 'axios';

const baseUrl = '/api/v1/';

export const getGenres = async ({path}) => {
    try {
        const {data: {genres}} = await axios.get(`${baseUrl}${path}`)
        return genres;
    } catch(e) {
        console.log(e);
        throw e;
    }
}