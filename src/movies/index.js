import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {createMoviesThunk, deleteMovieThunk, findAllMoviesThunk} from "./movies-thunks";
import {userLikesMovieThunk} from "../likes/likes-thunks";
import NavigationSidebar from "./sidebar";

const Movies = () => {
    const {currentUser} = useSelector((state) => state.users)
    const {movies} = useSelector((state) => state.movies)
    const [movie, setMovie] = useState({title: 'New Movie'})
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findAllMoviesThunk())
    }, [])
    return(
        <>
            <h1>Movies</h1>
            {
                currentUser &&
                <h2>Welcome {currentUser.username} </h2>
            }
            <div className="row mt-2">
                <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                    <NavigationSidebar active="home"/>
                </div>
                <div className="col-10 col-md-10 col-lg-7 col-xl-6"
                     style={{"position": "relative"}}>
            <ul className="list-group">
                <li className="list-group-item">
                    <button className="btn btn-success float-end" onClick={() => {
                        dispatch(createMoviesThunk(
                            {
                                title: movie.title
                            }
                        ))
                    }}>Create</button>
                    <input
                        className="form-control w-75"
                        onChange={(e) =>
                            setMovie({...movie, title: e.target.value})}
                        value={movie.title}/>
                </li>
                {
                    movies.map((movie) =>
                        <li className="list-group-item"
                            key={movie._id}>
                            <i onClick={() => {
                                dispatch(deleteMovieThunk(movie._id))
                            }}
                                className="bi bi-trash float-end"></i>

                            <i onClick={() => {
                                dispatch(userLikesMovieThunk({
                                    mid: movie._id
                                }))
                            }} className={`${currentUser? '' : 'd-none'} float-end bi bi-hand-thumbs-up me-2`}></i>
                            <i className={`${currentUser? '' : 'd-none'} float-end bi bi-hand-thumbs-down me-2`}></i>


                            {movie.title}
                        </li>
                    )
                }
            </ul>
                </div>
            </div>
        </>
    )
}

export default Movies;
