import React, { Component } from 'react';

class Gallery extends Component {
  render() {

    if(this.props.data){
      var album = this.props.data.albums.map(function(album){
        var albumImage = 'images/albums/'+ album.image;
        return <div key={album.title} className="columns gallery-item">
           <div className="item-wrap">
            <a href={album.url} title={album.title}>
               <img alt={album.title} src={albumImage} />
               <div className="overlay">
                  <div className="gallery-item-meta">
                 <h5>{album.title}</h5>
                     <p>{album.category}</p>
                  </div>
                </div>
              <div className="link-icon"><i className="fa fa-link"></i></div>
            </a>
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

export default Gallery;
