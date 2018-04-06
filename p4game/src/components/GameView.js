import React, { Component } from 'react';
import './css/GameView.css';
class GameView extends Component {
  state = {}

  render() { 
    
    // let description = this.props.info.results[0].description;
    // let image = this.props.info.results[0].image;
    // console.log(description);
    // console.log(image);
    
    return ( 
    <div className="contentbox leftbox">
      <img src={this.props.info.results[0].image.medium_url}/>
     
      {/* this renders the string data as HTML. super important since its all html tags being sent as string. */}
      <div dangerouslySetInnerHTML={{__html: this.props.info.results[0].description}} />
    
    </div> 
    )
  }
}
 
export default GameView;