import { SongMetadata } from "@/supabase";

export default function Song({ title, filename } : SongMetadata) {
  return (
      <div className="py-3 px-5 border rounded-2xl flex gap-3 justify-between items-center bg-black/10">
          <h1 className="text-black/50">{title}</h1>
          <div className="flex items-center gap-2.5">
              <audio controls={true} src={`https://hrcyxwfhttrflcuvtqzy.supabase.co/storage/v1/object/public/music/${encodeURI(filename)}`} />
              {/*<strong>W A V E F O R M</strong>*/}
              {/*<button className="pl-3 pr-2 py-2 border rounded-full bg-black/20">*/}
              {/*    <svg width="16" height="20" viewBox="0 0 27 30" xmlns="http://www.w3.org/2000/svg">*/}
              {/*        <path d="M27 14.809L0 29.6181V0L27 14.809Z" fill="#6F6F6F"/>*/}
              {/*    </svg>*/}
              {/*</button>*/}
              <button className="px-2 py-2 border rounded-full bg-black/20">
                  <svg width="19" height="20" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.0852 5.27091C13.37 -8.34227 -21.5409 5.27083 20.0852 36.2299C61.3259 5.27091 26.8004 -8.34227 20.0852 5.27091Z" fill="#6F6F6F"/>
                  </svg>
              </button>
          </div>
      </div>
  )
}