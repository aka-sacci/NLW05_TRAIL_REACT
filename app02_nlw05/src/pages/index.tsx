import {GetStaticProps} from 'next';
import Image from 'next/image';
import Link from 'next/link';


import { api } from '../services/api';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { convertDurationToString } from '../utils/convertDurationToTimeString';

import homeStyles from './home.module.scss';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/playerContext';
import Header from 'next/head'



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
  const episodeList = [...lastestEpisodes, ...allEpisodes];

  const { playList } = useContext(PlayerContext);
  
  return (
    
    <div className={homeStyles.homepage}>
     <Header>
       <title>Podcastr - Bem Vindo!</title>
       </Header>  
     <section className={homeStyles.lastest}>
      <h2>Últimos Lançamentos </h2>

      <ul>

      {lastestEpisodes.map((ep, index) => {
        return(
          <li key={ep.id}>
            <Image 
            width={192} 
            height={192} 
            src={ep.thumbnail}
            alt={ep.title}
            objectFit = "cover"/>

            <div className={homeStyles.details}>
              <Link href={`/episodes/${ep.id}`}>
              <a>{ep.title}</a>
              </Link>
              <p>{ep.members}</p>
              
              <span>{ep.publishedAt}</span>
              <span>{ep.durationAsString}</span>
            </div>
            <button type="button" onClick={() => playList(episodeList, index)}>
              <img src="/play-green.svg"/>
            </button>
           

          </li>
        )
      })}
      </ul>
     </section>


     <section className={homeStyles.all}>
      <h2>Todos os episódios</h2>

      <table cellSpacing={0}>
        <thead>
          <tr>
          <th></th>
          <th>Podcast</th>
          <th>Integrantes</th>
          <th>Data</th>
          <th>Duração</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {allEpisodes.map((ep, index) => {
            return(
            <tr key={ep.id}>

              <td style={{ width : 60  }}>
              <Image 
            width={192} 
            height={192} 
            src={ep.thumbnail}
            alt={ep.title}
            objectFit = "cover"/>
              </td>

              <td>
                <Link href={`/episodes/${ep.id}`}>
                <a>{ep.title}</a>
                </Link>
              </td>

              <td>{ep.members}</td>

              <td style={{ width : 90 }}>{ep.publishedAt}</td>
              
              <td>{ep.durationAsString}</td>

              <td>
                <button type="button" onClick={() => playList(episodeList, index + lastestEpisodes.length)}>
                <img src="/play-green.svg"/>
                </button>
            </td>

            </tr>
            )
          })}
        </tbody>
      </table>
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