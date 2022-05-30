import { Link, Outlet } from "react-router-dom";
import { getAlbums } from "../Components/Gallery";

export default function Albums() {
  let albums = getAlbums();
  return (
    <main style={{ padding: "1rem 0"}}>
      <h2>This is where the albums go</h2>
      {albums.map(album => (
        <Link to={`/albums/${album.title}`}>
          <img alt={album.title} src={album.thumbnail} />
        </Link>
      ))}
      <Outlet />
    </main>
  );
}
