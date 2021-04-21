import headStyles from './styles.module.scss'
import dateFormat from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

export function Header(){
    const currentDateWD = dateFormat(new Date(), "EEEE", {
        locale: ptBR
    })    
    const currentDateDM = dateFormat(new Date(), ", d 'de' MMMM", {
        locale: ptBR
    })    

    return(

        <header className={headStyles.container}>
        <img src="/logo.svg" alt="..."></img>
        <p>Seu app de Podcasts favorito!</p>
        <span className={headStyles.spanUppercase}>{currentDateWD}</span>
        <span>{currentDateDM}</span>

        </header>

    );
}