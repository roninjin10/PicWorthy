import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class Accept extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: []
    }
  }


  onDrop(img) {
    axios({
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {Authorization: "Client-ID 3f9b22888755abe"},
        data: {
            image: img
        }

    })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err) {
        console.log(err);
    })

  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={(this.onDrop.bind(this))}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
            <p>Only *.jpeg and *.png images will be accepted</p>
          </Dropzone>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h4>Rejected files</h4>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
        <button type="submit">upload</button>
      </section>
    );
  }
}



export default Accept;