import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../services/api";
import { convertDurationToString } from "../../utils/convertDurationToTimeString";
import epStyles from './episodes.module.scss';


type SingleEpisode = {

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
 
 type EpisodeProps = {
    ep: SingleEpisode
 
 }
 
export default function Episode({ ep }: EpisodeProps){

    return(
        <div className={epStyles.episode}>
            <div className={epStyles.thumbContainer}>
                <Link href="/">
                <button type="button">
                    <img src="/arrow-left.svg" alt="Voltar"></img>
                </button>
                </Link>
        <Image
        width={700}
        height={160}
        src={ep.thumbnail}
        objectFit="cover"
        />
        <button type="button">
                    <img src="/play.svg" alt="Tocar Episódio"></img>
                </button>
                </div>

                <header>
                    <h1>{ep.title}</h1>
                    <span>{ep.members}</span>
                    <span>{ep.publishedAt}</span>
                    <span>{ep.durationAsString}</span>
                </header>

                <div className={epStyles.description} dangerouslySetInnerHTML={{__html: ep.description}}/>
                 
        </div>

        
)
}

export const getStaticPaths: GetStaticPaths = async () => {

    return{
        paths: [],
        fallback: 'blocking'
    }

}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params;
    const { data } = await api.get(`/episodes/${id}`);
    const ep = {

        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd, MMM yy', {locale: ptBR}),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url
    
    }
    return {
        props: {
            ep,
        },

        revalidate: 60*60*48


    }
    
}