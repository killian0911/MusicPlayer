import React from "react";
import LibrarySong from "./librarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, currentSong}) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong currentSong={currentSong} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} song={song} songs={songs} setCurrentSong={setCurrentSong} key={song.id}/>
                ))};
            </div>
        </div>
    );
};

export default Library;