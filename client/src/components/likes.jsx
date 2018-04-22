import React from 'react';
import PicRow from './picrow.jsx';
import axios from 'axios';

export default class Likes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('thispropslikes', this.props);
    return (
      <div style={{minHeight: `calc(100vh - 150px)`}}>
        <div>
        <h1 style={{fontFamily: `billabong`, textAlign: `center`, color: `#32bfff`}}>{this.props.userData.firstName}'s Favorites</h1>
        <br />
        </div>
        <PicRow rowType="likes" userId={this.props.userData._id}/>
      </div>
    )
  }
}
