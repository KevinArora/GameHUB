import React, { Component } from 'react';
import axios from 'axios';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import mithril from 'mithril';
import fetchJsonp from 'fetch-jsonp';
import GameView from './GameView';
import TwitchView from './TwitchView';
import Example from './Carousel';


let data = {};
const API_ID = process.env.REACT_APP_API_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      info: {
            "aliases": null,
            "api_detail_url": "https://www.giantbomb.com/api/game/3030-48190/",
            "date_added": "2014-11-07 12:10:07",
            "date_last_updated": "2017-11-12 20:44:32",
            "deck": "A stylish sci-fi, team-based, first-person shooter from Blizzard in which players can choose from a wide range of Heroes with unique weapons and abilities.",
            "description": "test",
            "image": {
              "medium_url": "https://www.giantbomb.com/api/image/scale_medium/2852990-overwatch.jpg",
              "image_tags": "All Images,Box Art"
            },
            "name": "Overwatch",
            "number_of_user_reviews": 0,
            "original_game_rating": [
              {
                "api_detail_url": "https://www.giantbomb.com/api/game_rating/3065-1/",
                "id": 1,
                "name": "ESRB: T"
              }
            ],
            "original_release_date": "2016-05-23 00:00:00",
            "platforms": [
              {
                "api_detail_url": "https://www.giantbomb.com/api/platform/3045-94/",
                "id": 94,
                "name": "PC",
                "site_detail_url": "https://www.giantbomb.com/pc/3045-94/",
                "abbreviation": "PC"
              },
              {
                "api_detail_url": "https://www.giantbomb.com/api/platform/3045-145/",
                "id": 145,
                "name": "Xbox One",
                "site_detail_url": "https://www.giantbomb.com/xbox-one/3045-145/",
                "abbreviation": "XONE"
              },
              {
                "api_detail_url": "https://www.giantbomb.com/api/platform/3045-146/",
                "id": 146,
                "name": "PlayStation 4",
                "site_detail_url": "https://www.giantbomb.com/playstation-4/3045-146/",
                "abbreviation": "PS4"
              }
            ],
            "site_detail_url": "https://www.giantbomb.com/overwatch/3030-48190/",
            "resource_type": "game"
      }
    
        ,
      twitch:null,
      query:"",
      response:{},
    }
    
  }
  getTwitch = async (game) => {
    await axios.get(`https://api.twitch.tv/kraken/search/streams?q=${game}&limit=100&offset=0&client_id=${API_ID}`)
    .then((res) => {
      let twitch = [...res.data]
      this.setState({twitch})
      console.log(res);
    })
  }

  getIGDB = async (game) => { 
    
    // var jsonp = require('jsonp');

    //   jsonp(`http://www.giantbomb.com/api/search/?format=jsonp&api_key=${API_KEY}&query=${game}`, jsonp, function (err, data) {
    //     if (err) {
    //     console.error(err.message);
    //   } else {
    //     console.log(data);
    //   }
    // });

    fetchJsonp(`https://www.giantbomb.com/api/search?api_key=${API_KEY}&format=jsonp&resources=game&limit=1&query=${game}`, {
      jsonpCallback: 'json_callback',
    })
    .then((response) => {
      return response.json()
    }).then((json) => {
      data = json
      this.setState({info:data.results[0]})
      console.log('parsed json', data.results[0])
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })

  //   fetchJsonp(`https://www.giantbomb.com/api/search?api_key=${API_KEY}&format=jsonp&resources=game&limit=1&query=${game}`)
  // .then(function(response) {
  //   return response.json()
  // }).then(function(json) {
  //   console.log('parsed json', json)
  // }).catch(function(ex) {
  //   console.log('parsing failed', ex)
  // })

    // mithril.jsonp({

    //   url: `https://www.giantbomb.com/api/search?api_key=${API_KEY}&format=jsonp&resources=game&limit=1&query=${game}`,
      
    //   callbackKey: "json_callback",
      
    //   })
      
    //   .then(function(response) {
    //     console.log(response.data)
    //     console.log(response.results)
    //     data = response.results[0]
    //     this.setState({response})
        
    //   })
      // this.setState({ info:data  })
      
    // await axios.get(`https://www.giantbomb.com/api/search/?api_key=ecf2a23ade0df5e6eb1a0e29ee29e0f1738c9553&format=jsonP&json_callback=JSON_CALLBACK&limit=1&query=Overwatch&resources=game&resources=game`)
    // await axios.get(`http://www.giantbomb.com/api/game/3030-4725/?api_key=${API_KEY}&format=json&field_list=genres,name`)
    // .then((res) => {
    //   let info = [...res.data]
    //   this.setState({info});
    //   console.log(res);
    // })
  }
  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }
    handleClick = ()=> {
     let value = document.querySelector('.query').value
     console.log(value);
     this.setState({query : value  });
     this.getTwitch(value);
     this.getIGDB(value);
     console.log(data);
    }
  render() {
    const { users } = this.state;
    return (
      <div>

        <div className="search-bar">
        <input 
        className="query form-control"
        placeholder="Game Name"
        />
        <button onClick={this.handleClick} className="btn btn-success stretch">Search</button>
       </div>
       
        <GameView 
        info={this.state.info}
        />
        <TwitchView 
        twitch={this.state.twitch}
        />
        
        {/* <p>The Home Page is accessible by every signed in user.</p> */}

        {/* { !!users && <UserList users={users} /> } */}
      </div>
    );
  }
}
// const UserList = ({ users }) =>
//   <div>
//     <h2>List of Usernames of Users</h2>
//     <p>(Saved on Sign Up in Firebase Database)</p>

//     {Object.keys(users).map(key =>
//       <div key={key}>{users[key].username}</div>
//     )}
//   </div>
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);
