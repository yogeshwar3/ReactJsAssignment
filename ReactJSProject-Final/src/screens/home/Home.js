import React, {useEffect, useState} from 'react';
import './Home.css';
import UpcomingMovies from "../../components/upcomingMovies/UpcomingMovies";
import ReleasedMovies from "../../components/releaseMovies/ReleasedMovies";
import {getMovies} from "../../api/movies";

export const Home = (props) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getData = async () => {
            setMovies(await getMovies({path: 'movies'}));
        }
        getData();
        props.changeBookShowId('');
    }, []);

    return (
        <div className='home'>
            <UpcomingMovies movies={movies}/>
            <ReleasedMovies movies={movies} changeBookShowId={props.changeBookShowId}/>
        </div>
    );
}

export default Home;