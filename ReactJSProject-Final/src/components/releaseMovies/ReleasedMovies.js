import React, {useEffect, useState} from 'react';
import './ReleasedMovies.css';
import {
    GridList,
    GridListTile,
    GridListTileBar,
    Card,
    CardContent,
    Typography,
    InputLabel,
    Input,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    ListItemText, TextField, Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {getGenres} from "../../api/genres";
import {getArtists} from "../../api/artists";
import {getMoviesByFilter} from "../../api/movies";
import {useHistory} from "react-router-dom";

// Note: This isn't working!! Did as part of the assignment
const styles = (theme) => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
    },
    cardTitle: {
        color: theme.palette.primary.light,
    }
});

export const ReleasedMovies = ({movies, changeBookShowId}) => {
    const classes = withStyles(styles);
    const history = useHistory();

    const [filteredMovies, setFilteredMovies] = useState([]);
    const releasedMovies = (filteredMovies.length > 0 ? filteredMovies : movies)
        .filter(m => m.status === "RELEASED")
        .map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                url: movie.poster_url,
                date: movie.release_date
            }
    });

    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState([]);

    const [movieName, setMovieName] = useState('')
    const [selectedGenres, setSelectedGenres] = useState([])
    const [selectedArtists, setSelectedArtists] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    useEffect(() => {
        const getData = async () => {
            setGenres(await getGenres({path: 'genres'}));
        }
        getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
            setArtists(await getArtists({path: 'artists'}));
        }
        getData();
    }, []);

    const onMovieNameChange = (e) => {
        setMovieName(e.target.value);
    }

    const onMovieClick = (id) => {
        changeBookShowId(id);
        history.push({pathname: `movie/${id}`, state: {id: {id}}});
    }

    const onGenreChange = (e) => {
        setSelectedGenres(e.target.value)
    }

    const onArtistChange = (e) => {
        setSelectedArtists(e.target.value)
    }

    const onStartDateChange = (e) => {
        setStartDate(e.target.value)
    }

    const onEndDateChange = (e) => {
        setEndDate(e.target.value)
    }

    const onApply = async () => {
        let params = new URLSearchParams({status: 'RELEASED'});
        movieName && params.append('title', movieName);
        selectedGenres.length > 0 && params.append('genre', selectedGenres.toString());
        selectedArtists.length > 0 && params.append('artists', selectedArtists.toString());
        startDate && params.append('start_date', startDate);
        endDate && params.append('end_date', endDate);

        setFilteredMovies(await getMoviesByFilter({path: 'movies', params: params}));
    }

    return (
        <div className='rm-root'>
            <div className='rm-movies'>
                <GridList cellHeight={350} cols={4}>
                    {releasedMovies.map(movie => (
                        <GridListTile onClick={() => {onMovieClick(movie.id)}} className="rm-movie" key={movie.id}>
                            <img src={movie.url} alt={movie.title} />
                            <GridListTileBar
                                title={movie.title}
                                subtitle={<span>Release Date: {new Date(movie.date).toDateString()}</span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
            <div className='rm-filters'>
                <Card className='rm-card'>
                    <CardContent className='rm-card-content'>
                        <FormControl className={classes.formControl}>
                            <Typography className={classes.cardTitle}>
                                FIND MOVIES BY:
                            </Typography>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="moviename">
                                Movie Name
                            </InputLabel>
                            <Input
                                id="moviename"
                                value={movieName}
                                onChange={onMovieNameChange}
                            />
                        </FormControl>

                        {/*Genres*/}
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="genres">Genre</InputLabel>
                            <Select
                                multiple
                                input={<Input id="genres" />}
                                renderValue={selected => selected.join(', ')}
                                value={selectedGenres}
                                onChange={onGenreChange}>

                                {genres.map(g => (
                                    <MenuItem key={g.id} value={g.genre}>
                                        <Checkbox checked={selectedGenres.indexOf(g.genre) > - 1} />
                                        <ListItemText primary={g.genre} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/*Artists*/}
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="artists">Artists</InputLabel>
                            <Select
                                multiple
                                input={<Input id="artists" />}
                                renderValue={selected => selected.join(', ')}
                                value={selectedArtists}
                                onChange={onArtistChange}>

                                {artists.map(a => (
                                    <MenuItem key={a.id} value={`${a.first_name} ${a.last_name}`}>
                                        <Checkbox checked={selectedArtists.indexOf(`${a.first_name} ${a.last_name}`) > - 1} />
                                        <ListItemText primary={`${a.first_name} ${a.last_name}`} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/*Release Date Start*/}
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="start-date"
                                label="Release Date Start"
                                InputLabelProps={{ shrink: true }}
                                type={'date'}
                                value={startDate}
                                onChange={onStartDateChange}
                            />
                        </FormControl>

                        {/*Release Date End*/}
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="end-date"
                                label="Release Date End"
                                InputLabelProps={{ shrink: true }}
                                type={'date'}
                                value={endDate}
                                onChange={onEndDateChange}
                            />
                        </FormControl>

                        {/*APPLY*/}
                        <FormControl className={classes.formControl}>
                            <Button onClick={onApply} variant="contained" color="primary" className='rm-apply'>
                                APPLY
                            </Button>
                        </FormControl>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ReleasedMovies;