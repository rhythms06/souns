import Head from 'next/head'
import Link from "next/link";
import Header from "@/pages/components/header";

export default function Home() {
  return (
    <>
      <Head>
        <title>SOUNS</title>
        <meta name="description" content="One song, every day, forever." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header href="/" />
      <main className="my-16">
          <p className="flex justify-center text-2xl sm:text-3xl md:text-4xl">
              One song, every day, forever.
          </p>
          <div className="mt-12 sm:mt-20 md:mt-0 sm:h-96 flex flex-col md:flex-row items-center justify-evenly">
              <Link href="/submit">
                  <div className="p-5 w-56 flex flex-col gap-5 rounded-3xl hover:bg-black/25">
                      <h1 className="text-4xl text-center">Submit</h1>
                      <p className="text-center">Anyone can submit a song once a day</p>
                  </div>
              </Link>
              <Link href="/vote">
                  <div className="p-5 w-56 flex flex-col gap-5 rounded-3xl hover:bg-black/25">
                      <h1 className="text-4xl text-center">Vote</h1>
                      <p className="text-center">Souns holders vote on what song they like</p>
                  </div>
              </Link>
              <Link href="/" className="cursor-not-allowed">
                  <div className="p-5 w-56 flex flex-col gap-5 rounded-3xl hover:bg-black/25">
                      <h1 className="text-4xl text-center">Auction</h1>
                      <p className="text-center">Top song is minted<br/><br/></p>
                  </div>
              </Link>
          </div>
      </main>
    </>
  )
}
