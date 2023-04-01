import Head from 'next/head';
import Header from "@/pages/components/header";
import { SongMetadata, supabase } from "@/supabase";
import { Song } from "@/pages/components/song";
import { GetStaticProps } from "next";

export default function Vote({ songs } : { songs: SongMetadata[] }) {
    return (
        <>
            <Head>
                <title>SOUNS | Vote</title>
                <meta name="description" content="One song, every day, forever." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header href="/vote" />
            <main className="mx-5 flex flex-col gap-2.5">
                <p>Vote on Souns&apos; next record (only for Souns holders)</p>
                <div className="p-2.5 h-screen flex flex-col gap-1.5 border-t border-x border-black rounded-t-3xl">
                    {songs.map( (song, index) =>
                        <Song key={index} title={song.title} filename={song.filename} />
                    )}
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    let songs;
    await supabase.from('songs').select('title, filename').then(
        response => songs = response.data
    );
    return { props: { songs }, revalidate: 10 };
}
