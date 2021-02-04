import React from 'react';
import {playAudio} from '../util';

const LibrarySong = ({song, setCurrentSong, audioRef, isPlaying, songs, setSongs, currentSong}) => {
    const songSelectHandler = () => {
        setCurrentSong(song);
        setSongs(songs.map((targetSong) => {
            return {
                ...targetSong,
                active: targetSong.id === song.id}
            })
        )
        playAudio(isPlaying,audioRef)
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