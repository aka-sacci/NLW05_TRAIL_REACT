import playerStyles from './styles.module.scss'


export function Player(){
      

    return(

    <div className={playerStyles.container}>
        <header>
            <img src="/playing.svg"/>
            <strong>Tocando Agora</strong>
        </header>

        <div className={playerStyles.emptyPlayer}>
             <strong>Selecione um Podcast pra ouvir</strong>
        </div>

        <footer className={playerStyles.empty}>

            <div className={playerStyles.progress}>
                <span>00:00</span>

                <div className={playerStyles.slider}>
                <div className={playerStyles.emptySlider}/>
                </div>
                
                <span>00:00</span>
            </div>

            <div className={playerStyles.buttons}>
                <button type="button">
                    <img src="/shuffle.svg" alt="Embaralhar"/>
                </button>
                <button type="button">
                    <img src="/play-previous.svg" alt="Tocar anterior"/>
                </button>
                <button type="button" className={playerStyles.playBtn}>
                    <img src="/play.svg" alt="Tocar"/>
                </button>
                <button type="button">
                    <img src="/play-next.svg" alt="Tocar próxima"/>
                </button>
                <button type="button">
                    <img src="/repeat.svg" alt="Repetir"/>
                </button>
            </div>

        </footer>
    </div>

    );
}