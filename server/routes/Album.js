import { useParams } from "react-router-dom";

export default function Album() {
  return (
    <main style={{ padding: "1rem 0"}}>
      <h2>This is the {params.albumTitle}.</h2>
    </main>
  );
}
