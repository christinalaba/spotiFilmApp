import React from 'react';
import axios from 'axios';
import MovieResults from './MovieResults'
import tokens from './tokens';

const apiURL = 'https://api.themoviedb.org/3'
const apiKey = 'ba4403ee3098a16bd3c83fc121edf709'


function checkToken() {
    return tokens.refresh_token !== '' 
        ? tokens.refresh_token
        : (location.search.length > 0 ? location.search.match(/access_token=([\w\d-.]+)/)[1] : '')
}

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            genre: [],
            userGenreSelection: "",
            token: checkToken(),
        };
        this.submitGenre = this.submitGenre.bind(this);
        this.logOut = this.logOut.bind(this);
        this.showMenu = this.showMenu.bind(this);
    }
    

    submitGenre (x) {
        this.setState({
            userGenreSelection: x
        })
    }

    logOut() {
        location.reload();
    }

    showMenu() {
        let burgermenu = document.getElementById('genreDropDown')
        burgermenu.classList.toggle('show');
    }

    componentDidMount() {
        axios.get(`${apiURL}/genre/movie/list`, {
            params: {
                api_key: 'ba4403ee3098a16bd3c83fc121edf709',
            }
        })
            .then(({ data }) => {
                this.setState({
                    genre: data.genres
                });
            });  
    }

    render() {
        return (  
            <div className="movieSelections">
                {this.state.token === '' ?

                    <div className="loginPage">
                        <div className="logoContainer clearfix">
                            <div className="logo clearfix" >
                                <div className="line smallLeft"></div>
                                <div className="line mediumLeft"></div>
                                <div className="line middle"></div>
                                <div className="line mediumRight"></div>
                                <div className="line smallRight"></div>
                            </div>
                            <h1>Soundtrak</h1>
                        </div>

                        <div className="buttonContainer">
                            <a className="logInButton" href='https://spotify-movie-soundtracks.herokuapp.com/auth'>Login with Spotify</a>
                        </div>

                    </div>
                     :
                    <div>
                        <nav className="fixedHeader">
                            <div className="wrapper clearfix">
                            
                                <div id="burger" onClick={this.showMenu.bind(this)}>
                                    <i class="fas fa-filter"></i>
                                </div>

                                <div onClick={this.logOut}>
                                    <i className="fas fa-user" id="user"></i>
                                </div>

                                <div className="navLogo clearfix">
                                    <img src="../../public/assets/soundbar2.png" alt="" />
                                    <p>Soundtrak</p>
                                </div>
                            </div>
                        </nav>

                    <div className="wrapper clearfix" id="genreDropDown">
                            <div className="dropDownTriangle"></div>
                            {this.state.genre.map((item) => {
                                return (
                                    <div className="genreList" onClick={this.showMenu.bind(this)} key={item.id}>
                                        <button onClick={() => this.props.showMovieByGenre(item.id)} key={item.id}>{item.name}</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>                   
                 }
            </div>
        )
    }
}

export default NavBar;