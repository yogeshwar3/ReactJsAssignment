import axios from 'axios';

const baseUrl = '/api/v1/';

export const getArtists = async ({path}) => {
    try {
        const response = await axios.get(`${baseUrl}${path}`);
        const params = new URLSearchParams({
            limit: response.data.total_count,
            page: 1
        });
        const {data: {artists}} = await axios.get(`${baseUrl}${path}?${params}`)
        return artists;
    } catch(e) {
        console.log(e);
        throw e;
    }
}