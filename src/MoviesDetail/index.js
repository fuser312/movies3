import React from "react";
import "./style.css"
import VideoThumbnail from 'react-video-thumbnail';



class MoviesDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null
        }
    }

    componentDidMount() {
        this.getMovieData()
    }

    async getMovieData() {
        let movieDataLink = "https://api.themoviedb.org/3/movie/" + this.props.match.params.id + "?api_key=18b9577e562289ee08b62627929f721b&append_to_response=videos";
        let res = await fetch(movieDataLink);
        let data = await res.json();
        this.setState({
            movie:data,
        })
        console.log("hello");
        console.log(JSON.stringify(this.state.movie));
        console.log("hi");
    }


    render() {
        if (this.state.movie === null) {
            return <div className={"main-page"}><p className={"loading"}>Loading</p></div>;
        } else {
            return (
                <div className={"main-details"}
                     style={{backgroundImage: `url(${"https://image.tmdb.org/t/p/original" + this.state.movie.backdrop_path})`}}>
                    <div className={"overlay"}></div>
                    <div className={"details-div"}>
                        <img src={"https://image.tmdb.org/t/p/original" + this.state.movie.poster_path} alt=""
                             className={"details-poster"}/>
                        <div className="videoThumbnail">
                            <VideoThumbnail
                                videoUrl={"https://www.youtube.com/watch?v="+this.state.movie.videos.results[0].key}
                                thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                                width={120}
                                height={80}
                            />

                        </div>
                        <div className="row">

                            <a href={"https://www.youtube.com/watch?v="+this.state.movie.videos.results[0].key}  target="_blank" rel="noopener noreferrer">
                                <button className="button">Watch Trailer</button></a>

                        </div>
                        <div className={"details-text"}>
                            <p className={"details-title"}>{this.state.movie.original_title}</p>
                            <p className={"details-overview"}>{this.state.movie.overview}</p>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default MoviesDetails;

