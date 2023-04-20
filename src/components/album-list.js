import React, { useState, useEffect } from "react";

function App() {
  const [albums, setAlbums] = useState([]);
  const [newAlbum, setNewAlbum] = useState("");
  const [editAlbum, setEditAlbum] = useState("");

  // Fetch albums from the API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.log(error));
  }, []);

  // Handle adding a new album
  const handleAddAlbum = () => {
    if (editAlbum === "" && newAlbum) {
      const albumData = { title: newAlbum };
      fetch("https://jsonplaceholder.typicode.com/albums", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(albumData),
      })
        .then((response) => response.json())
        .then((data) => setAlbums([...albums, data]))
        .catch((error) => console.log(error));
      setNewAlbum("");
    } else {
      const updatedAlbum = albums.find((elem) => {
        return elem.id === editAlbum;
      });
      console.log(updatedAlbum);
      setNewAlbum(updatedAlbum.title);
      setAlbums((prev) => {
        const updatedAlbum = prev.find((elem) => {
          return elem.id === editAlbum;
        });
        updatedAlbum.title = newAlbum;
        return prev;
      });
    }
  };

  // Handle updating an album
  const handleUpdateAlbum = (id) => {
    const updatedAlbum = albums.find((elem) => {
      return elem.id === id;
    });
    console.log(updatedAlbum);
    setNewAlbum(updatedAlbum.title);
    setEditAlbum(id);
    setAlbums((prev) => {
      const updatedAlbum = prev.find((elem) => {
        return elem.id === id;
      });
      updatedAlbum.title = newAlbum;
      return prev;
    });
  };

  // Handle deleting an album
  const handleDeleteAlbum = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedAlbums = albums.filter((album) => album.id !== id);
        setAlbums(updatedAlbums);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <div className="input-box">
        <input
          className="input-child"
          type="text"
          value={newAlbum}
          onChange={(event) => setNewAlbum(event.target.value)}
          placeholder="add an album"
        />
        <div className="input-button">
          <button onClick={handleAddAlbum}>
            <i class="fa-solid fa-circle-plus"></i>
          </button>
        </div>
      </div>
      <h1>Albums-List</h1>
      <ul className="list">
        {albums.map((album) => (
          <li className="list-item" key={album.id}>
            {album.title}
            <div className="list-buttons">
              <button
                className="list-button"
                onClick={() => handleUpdateAlbum(album.id)}
              >
                <i class="fa-regular fa-pen-to-square"></i>
              </button>

              <button
                className="list-button"
                onClick={() => handleDeleteAlbum(album.id)}
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
