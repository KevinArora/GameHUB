import React, { Component } from 'react';
import './css/GameView.css';
import TwitchView from './TwitchView';
class GameView extends Component {
  state = {}

  render() { 
    
    // let description = this.props.info.results[0].description;
    // let image = this.props.info.results[0].image;
    // console.log(description);
    // console.log(image);
    // console.log(this.props.info);
    
    // function calculateDivHeight(){
    //   document.getElementById("scrollablediv").height(window.innerHeight);
    // }
    // calculateDivHeight();
    // $(window).resize(function () {
    //   calculateDivHeight();
    // }

    return ( 
    <div className="info" id="scrollablediv" >
      <img src={this.props.info.image.medium_url}/>
      
      {/* this renders the string data as HTML. super important since its all html tags being sent as string. */}
      <div dangerouslySetInnerHTML={{__html: this.props.info.description}} />
    
    </div> 
    )
  }
}
 
export default GameView;