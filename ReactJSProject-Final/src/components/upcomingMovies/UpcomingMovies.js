import React from 'react';
import './UpcomingMovies.css';
import {GridList ,GridListTile, GridListTileBar } from '@material-ui/core';

export const UpcomingMovies = ({movies}) => {
    const upcomingMovies = movies.filter(m => m.status === "PUBLISHED").map((movie) => {
        return {
            id: movie.id,
            title: movie.title,
            url: movie.poster_url
        }
    });

    return (
        <div className='um-root'>
            <header className='um-header'>
                Upcoming Movies
            </header>
            <GridList cellHeight={250} cols={5} className='um-movies'>
                {upcomingMovies.map(movie => (
                    <GridListTile key={movie.id} className='um-tile'>
                        <img src={movie.url} alt={movie.title} className='um-image' height={250}/>
                        <GridListTileBar title={movie.title}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default UpcomingMovies;