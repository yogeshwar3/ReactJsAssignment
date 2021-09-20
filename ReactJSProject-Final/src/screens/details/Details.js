import React, {useEffect, useState} from 'react';
import './Details.css';
import {Link, useLocation} from "react-router-dom";
import YouTube from 'react-youtube';
import Typography from "@material-ui/core/Typography";
import {getMovieById} from "../../api/movies";
import {StarBorder as StarBorderIcon} from "@material-ui/icons";
import {GridList, GridListTile, GridListTileBar} from "@material-ui/core";

export const Details = (props) => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [movie, setMovie] = useState(null);
    const [stars, setStars] = useState(Array(5).fill('black'))

    useEffect(() => {
        const getData = async () => {
            setMovie(await getMovieById({path: `movies/${id}`}));
        }
        getData();
        !props.showBookButton && props.changeBookShowId(id)
    }, [])

    const onStarClick = (id) => {
        if(stars.length > 0) {
            const rating = stars.map((s, idx) => {
                return idx <= id ? 'yellow' : 'black';
            })
            setStars(rating);
        }
    }

    return (
        <React.Fragment>
            <Typography className='go-back'>
                <Link to={'/'}>
                    &#60; Back to Home
                </Link>
            </Typography>
            {movie &&
                <div className='details'>
                    <div className='d-left'>
                        <img src={movie.poster_url} alt={movie.title}/>
                    </div>
                    <div className='d-middle'>
                        {/*Title*/}
                        <Typography variant="headline" component={'h2'}>{movie.title}</Typography>

                        {/*Genre*/}
                        <Typography component={'div'}>
                            <span className='bold'>Genre: </span>
                            {movie.genres.join(', ')}
                        </Typography>

                        {/*Duration*/}
                        <Typography component={'div'}>
                            <span className='bold'>Duration: </span>
                            {movie.duration}
                        </Typography>

                        {/*Release Date*/}
                        <Typography component={'div'}>
                            <span className='bold'>Release Date: </span>
                            {new Date(movie.release_date).toDateString()}
                        </Typography>

                        {/*Rating*/}
                        <Typography component={'div'}>
                            <span className='bold'>Rating: </span>
                            {movie.rating}
                        </Typography>

                        {/*Plot Text*/}
                        <Typography className='margin-top-16' component={'div'}>
                            <span className='bold'>Plot: </span>
                            <a href={movie.wiki_url} target='_blank'>(Wiki Link)</a>
                            &nbsp;{movie.storyline}
                        </Typography>

                        {/*Trailer*/}
                        <Typography className='margin-top-16' component={'div'}>
                            <span className='bold'>Trailer: </span>
                            <YouTube videoId={movie.trailer_url.split("?v=")[1]}/>
                        </Typography>
                    </div>
                    <div className='d-right'>
                        {/*Rate the movie*/}
                        <Typography className='margin-top-16' component={'div'}>
                            <span className='bold'>Rate this movie: </span>
                        </Typography>
                        <div className={'rating'}>
                            {stars.map((color, idx) => (
                                <StarBorderIcon className={color} key={idx} onClick={() => onStarClick(idx)} />
                            ))}
                        </div>

                        {/*Artists*/}
                        <Typography className='margin-top-16' component={'div'}>
                            <span className='bold'>Artists: </span>
                        </Typography>
                        <GridList cellHeight={160} cols={2}>
                            {movie.artists.map(artist => (
                                <GridListTile key={artist.id}>
                                    <img src={artist.profile_url} alt={`${artist.first_name} ${artist.last_name}`} />
                                    <GridListTileBar title={`${artist.first_name} ${artist.last_name}`}/>
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                </div>
            }
        </React.Fragment>
    );
}

export default Details;