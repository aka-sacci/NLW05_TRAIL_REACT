import { createContext, useState, ReactNode } from 'react';
import Episode from '../pages/episodes/[id]';

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: number,
    url: string
};
type playerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    play: (episode: Episode) => void,
    togglePlay: () => void
    setPlayingState: (state: boolean) => void,
    playList: (list: Episode[], index: number) => void,
    playNext: () => void,
    playPrevious: () => void,
    hasNext: boolean,
    hasPrevious: boolean,
    toggleLoop: () => void,
    isLooping: boolean,
    isShuffling: boolean,
    toggleShuffle: () => void,
    clearPlayerState: () => void

};

export const PlayerContext = createContext({} as playerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps){

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const hasPrevious = currentEpisodeIndex > 0;
    const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;


    function play(episode: Episode){
      setEpisodeList([episode]);
      setCurrentEpisodeIndex: 0;
      setIsPlaying(true);
    }

    function playList(list: Episode[], index: number){
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function togglePlay(){
      setIsPlaying(!isPlaying)
    }
  
    function setPlayingState(state: boolean){
      
      setIsPlaying(state);
  
    }

    function playNext(){

    if(isShuffling){
      
        const nextRandomEpisodeIndex = Math.floor((Math.random() * episodeList.length))
        setCurrentEpisodeIndex(nextRandomEpisodeIndex);

    }else{


    if(!hasNext){

        return;

    }else{

        setCurrentEpisodeIndex(currentEpisodeIndex + 1);

    }


    }
    }

    function playPrevious(){

    
        if(hasPrevious){
        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    }

    function clearPlayerState(){
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    }

    function toggleLoop(){
        setIsLooping(!isLooping)
    }

    function toggleShuffle(){
        setIsShuffling(!isShuffling);
    }

    return(
  
      <PlayerContext.Provider value={{ episodeList,
       currentEpisodeIndex, 
       play, 
       isPlaying, 
       togglePlay, 
       setPlayingState,
       playList,
       playNext,
       playPrevious,
       hasNext,
       hasPrevious,
       toggleLoop,
       isLooping,
       toggleShuffle,
       isShuffling,
       clearPlayerState
       }}>

    {children}

    </PlayerContext.Provider>
          )
          

}
