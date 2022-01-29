import { useParams } from "react-router-dom";
import { useState, useEffect } from "react/cjs/react.development";
import styles from "./Home.module.css";

function Detail() {
    const { id } = useParams();
    const [ loading, setloading ] = useState(true);
    const [ movieDetail, setMovieDetail ] = useState([]);
    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovieDetail(json.data.movie);
        setloading(false);
        //console.log(json);
        //console.log(movieDetail);
    }
    useEffect(() =>{
        getMovie();
    }, []);
    return (
        <div>
            {loading ? ( 
                <div className={styles.loader}>
                <span>Loading...</span>
              </div>
                ) : (
                <div>
                    <img src={movieDetail.large_cover_image} alt={movieDetail.title}/>
                    <h1>{movieDetail.title_long}</h1>
                    <ul>
                        {movieDetail.genres && movieDetail.genres.map((g) => (
                            <li key={g}>{g}</li>
                        ))}
                    </ul>
                    <p>{movieDetail.description_full}</p>
                </div>
                )
            }
        </div>
    );
}

export default Detail;