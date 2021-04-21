import {GetStaticProps} from 'next';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToString } from '../utils/convertDurationToTimeString';

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
 episodes: Episode[]
}

export default function Home(props: HomeProps) {
  return (
    <>
    {console.log(JSON.stringify(props.episodes))
    }   
    </>
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

  

  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8
  }
  
}