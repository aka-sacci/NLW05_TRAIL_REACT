import {GetStaticProps} from 'next';
import Image from 'next/image';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToString } from '../utils/convertDurationToTimeString';
import homeStyles from './home.module.scss';


type Episode = {
   id: string,
   title: string,
   members: string,
   thumbnail: string,
   description: string,
   duration: number,
   durationAsString: string,
   url: string,
   publishedAt: string;

  };

type HomeProps = {
  allEpisodes: Episode[],
  lastestEpisodes: Episode[]

}

export default function Home({ lastestEpisodes, allEpisodes}: HomeProps) {
  return (
    <div className={homeStyles.homepage}>
     
     <section className={homeStyles.lastest}>
      <h2>Últimos Lançamentos</h2>

      <ul>

      {lastestEpisodes.map(ep => {
        return(
          <li key={ep.id}>
            <Image 
            width={192} 
            height={192} 
            src={ep.thumbnail}
            alt={ep.title}
            objectFit = "cover"/>

            <div className={homeStyles.details}>
              <a href="">{ep.title}</a>
              <p>{ep.members}</p>
              
              <span>{ep.publishedAt}</span>
              <span>{ep.durationAsString}</span>
              
            </div>
 
         

          </li>
        )
      })}

      </ul>
     </section>


     <section className={homeStyles.all}>

     </section>
    </div>
  )
}

export const getStaticProps:GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
  params: {
    _sort: 'published_at',
    _order: 'desc'
  }
  })

  const episodes = data.map(episode => {
    return{

      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd, MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url


    }

  })

  
  const lastestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      lastestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
  
}