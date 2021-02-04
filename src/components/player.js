import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";
import {playAudio} from '../util';

const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, songs, setCurrentSong}) => {
    //Event Handler
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        }
        else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        //Calculate animation percentage
        const animation = Math.round((Math.round(current) / Math.round(duration)) * 100);
        setSongInfo({...songInfo, currentTime: current, duration, animationPercentage : animation,})
    };
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    };
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime : e.target.value});
    };
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction === 'skip-back'){
            if((currentIndex - 1) % songs.length === - 1){
                setCurrentSong(songs[songs.length - 1]);
                playAudio(isPlaying,audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying,audioRef);
    };
    //State
    const [songInfo, setSongInfo] = useState({
        currentTime: "0",
        duration: "0",
        animationPercentage: "0",
    });
    //Styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }


    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background : `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range"/>
                    <div style={trackAnim} className="track-slider"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className='back' icon={faAngleLeft} size="2x"/>
                <FontAwesomeIcon onClick={playSongHandler} className='play' icon={isPlaying ? faPause : faPlay} size="2x"/>
                <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className='next' icon={faAngleRight} size="2x" />
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
        </div>
    );
};

export default Player;