import React, { Component } from 'react';
import { Outlet, BrowserRouter, Link } from "react-router-dom";
class Gallery extends Component {
  render() {

    if(this.props.data){
      var album = this.props.data.albums.map(function(album){
        var albumImage = 'images/albums/'+ album.thumbnail;
        var albumLink = '/albums' + album.url;
        return <div key={album.title} className="columns gallery-item">
          <div className="item-wrap">
            <Link to={albumLink}>
              <img alt={album.title} src={'/images/albums/' + album.title + '/' + album.thumbnail} />
               <div className="overlay">
                  <div className="gallery-item-meta">
                    <h5>{album.title}</h5>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </Link>
            <Outlet />
          </div>
        </div>
      })
    }

    return (
      <section id="gallery">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Browse My Photos.</h1>

            <div id="gallery-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {album}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

function getAlbums() {
    return this.props.data.albums
}

export {Gallery, getAlbums};
