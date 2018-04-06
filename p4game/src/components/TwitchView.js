import React, { Component } from 'react';
class TwitchView extends Component {
  state = {}
  render() { 
    return ( 
    <div className="stream">
      <iframe
        src={`http://player.twitch.tv/?channel=loltyler1`}
        height="360"
        width="650"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true">
    </iframe>
    </div> )
  }
}
 
export default TwitchView;