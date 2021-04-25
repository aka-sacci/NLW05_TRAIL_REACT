import Image from 'next/image';
import { useContext, useRef, useEffect, useState } from 'react';
import { PlayerContext } from '../../contexts/playerContext';
import playerStyles from './styles.module.scss';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { convertDurationToString } from '../../utils/convertDurationToTimeString';

export function Player(){
    const [progress, setProgress] = useState(0)
    const audioRef = useRef<HTMLAudioElement>(null);

    const { episodeList,
        currentEpisodeIndex,
        isPlaying,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle,
        clearPlayerState
      }
        = useContext(PlayerContext);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) audioRef.current.play();
        
        else audioRef.current.pause();

    }, [isPlaying]);
    const episode = episodeList[currentEpisodeIndex];


    function setupProgressListener(){
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener("timeupdate", () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })

    }
        
   function handleSeek(amount: number){
 
       audioRef.current.currentTime = amount;
       setProgress(amount); 


   }


   function handleEpisodeEnded(){
       if (hasNext){
           playNext()
       }
           else{
            clearPlayerState()
           }
       }
   


    return(

    <div className={playerStyles.container}>
        <header>
            <img src="/playing.svg"/>
            <strong>Tocando Agora</strong>
        </header>

        {
            episode ? (
                <div className={playerStyles.currentEpisode}>
                <Image width={592}
                 height={592} 
                 src={episode.thumbnail} 
                 objectFit="cover"/>
                 <strong>{episode.title}</strong>
                 <strong>{episode.members}</strong>
                </div>
            ) : (
                <div className={playerStyles.emptyPlayer}>
                <strong>Selecione um Podcast pra ouvir</strong>
                </div>
            )
        }

        <footer className={!episode ? playerStyles.empty : ''}>

            <div className={playerStyles.progress}>
                <span>{episode ? convertDurationToString(progress) : "00:00"}</span>

                <div className={playerStyles.slider}>

                {
            episode ? (

                <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{backgroundColor: '#04d361'}}
                railStyle={{ backgroundColor: '#9f75ff  '}}
                handleStyle={{ borderColor: '#04d361', borderWidth: 3}}
                />

            ) : ( <div className={playerStyles.emptySlider}/>)
                }
                
                </div>
                
            <span>{episode ? convertDurationToString(episode.duration) : "00:00"}</span>
            </div>

            { episode && (
                <audio
                src={episode.url}
                ref={audioRef}
                loop={isLooping}
                onEnded={handleEpisodeEnded}
                onPlay={() => setPlayingState(true)}
                onPause={() => setPlayingState(false)}
                onLoadedMetadata = {setupProgressListener}
                autoPlay
                />
            )
            }

            <div className={playerStyles.buttons}>

                <button type="button" disabled={!episode || episodeList.length == 1} onClick={toggleShuffle} className={isShuffling ? playerStyles.isActive : ""}>
                    <img src="/shuffle.svg" alt="Embaralhar"/>
                </button>

                <button type="button" onClick={playPrevious} disabled={!episode || !hasPrevious}>
                    <img src="/play-previous.svg" alt="Tocar anterior"/>
                </button>

                <button type="button" className={playerStyles.playBtn} onClick={togglePlay} disabled={!episode}>

                {isPlaying
                ?  <img src="/pause.svg" alt="Tocar"/>
                : <img src="/play.svg" alt="Tocar"/>
                }
        
                </button>


                <button type="button"  onClick={playNext} disabled={!episode || !hasNext}>
                    <img src="/play-next.svg" alt="Tocar próxima"/>
                </button>

                <button type="button" disabled={!episode} onClick={toggleLoop} className={isLooping ? playerStyles.isActive : ""}>

                    <img src="/repeat.svg" alt="Repetir"/>
                </button>
            </div>

        </footer>
    </div>

    );
}