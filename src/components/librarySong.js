import React from 'react';

const LibrarySong = ({song, setCurrentSong, audioRef, isPlaying, songs, setSongs, currentSong}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        setSongs(songs.map((targetSong) => {
            return {
                ...targetSong,
                active: targetSong.id === song.id}
            })
        )
        if(isPlaying) audioRef.current.play();
    };
    return(
        <div onClick={songSelectHandler} className={`library-song ${song.id === currentSong.id ? "selected" : ""}`}>
            <img alt={song.name} src={song.cover}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;