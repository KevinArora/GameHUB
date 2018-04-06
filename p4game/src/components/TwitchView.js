import React, { Component } from 'react';
class TwitchView extends Component {
  state = {}

  handleClick = () => {
    this.props.handleStreamChange()
  }

  render() { 
    // let count = 0;
  //  function handleStreamChange() {
  //     if (count > 10)count = 0;
  //     if (count <= 0)count = 10;
  //     count++
  //     console.log(count);
  //   };
    return ( 
    <div className="stream">
      <iframe
        src={`http://player.twitch.tv/?channel=${this.props.channel}`}
        height="360"
        width="650"
        frameBorder="0"
        scrolling="no"
        allowFullScreen="true">
    </iframe>
    <button className="nextbutton btn btn-success" onClick={this.handleClick}> Next </button>
    </div> )
  }
}
 
export default TwitchView;