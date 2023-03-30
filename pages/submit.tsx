import Head from 'next/head';
import Header from "@/pages/components/header";
import { FileUploader } from "react-drag-drop-files";
import React, { useState } from "react";
import { supabase } from "@/pages/supabase";
import Link from "next/link";

export default function Submit() {
    const [ title, setTitle ] = useState('');
    const [ file, setFile ] = useState(null);
    const [ isTooLarge, setIsTooLarge ] = useState(false);
    const [ isWrongType, setIsWrongType ] = useState(false);
    const [ uploading, setUploading ] = useState(false);
    const [ uploadFailed, setUploadFailed ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    const sanitize = (string : string) => string.replace(/[^\w\/!\-.*()\s&$@=;:+,?'"]/g, '-');

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUploading(true);
        const filename = Math.floor(Math.random() * 1000) + sanitize(file.name);
        await supabase
            .storage
            .from('music')
            .upload(filename, file, {
                cacheControl: '3600',
                upsert: false
            })
            .then(async () => {
                await supabase
                    .from('songs')
                    .insert({title: title, filename: filename})
                    .then(() => setSuccess(true));
            })
            .catch(() => setUploadFailed(true));
        setUploading(false);
    }

    return (
        <>
            <Head>
                <title>SOUNS | Submit</title>
                <meta name="description" content="One song, every day, forever." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header href="/submit" />
            <main className="mt-16">
                <p className="flex justify-center text-3xl sm:text-4xl">
                    {!success ? "Submit your music" : "Success!"}
                </p>
                <div className="mt-12 w-full flex justify-center">
                    {!success ?
                        <form onSubmit={event => submit(event)} className="py-5 px-7 rounded-3xl bg-black/10">
                            <div className="flex flex-col gap-5">
                                <input type="text" placeholder="Title" required={true}
                                       value={title} onChange={event => setTitle(event.target.value)}
                                       className="border-none text-center text-lg bg-black/0 focus:ring-0" />
                                <FileUploader dropMessageStyle={{opacity: 0}}
                                              handleChange={file => setFile(file)}
                                              types={["MP3", "WAV", "FLAC", "OGG"]} onTypeError={() => setIsWrongType(true)}
                                              maxSize={50} onSizeError={() => setIsTooLarge(true)}>
                                    <div className="py-8 flex flex-col gap-5 justify-center rounded-3xl bg-black/20">
                                        { !file && !isTooLarge && !isWrongType &&
                                            <>
                                                <p className="text-center">Click or drag to upload</p>
                                                <p className="text-sm text-center">Accepted file formats: MP3, WAV, FLAC, OGG</p>
                                            </>
                                        }
                                        { !file && (isTooLarge || isWrongType) &&
                                            <p className="text-sm text-center">
                                                {isWrongType && "The given file format is unsupported."}
                                                {!isWrongType && isTooLarge && "Your submission must be less than 50 MB."}
                                            </p>
                                        }
                                        { file &&
                                            <>
                                                <p className="max-w-sm text-center">{file.name}</p>
                                            </>
                                        }
                                    </div>
                                </FileUploader>
                                <label className="w-96 inline-flex gap-5">
                                    <input type="checkbox" required={true} className="mt-1 bg-black/0 border-2" />
                                    <span className="text-sm">
                                    I have reviewed and accept the terms and conditions of submitting to Souns Records.
                                </span>
                                </label>
                                <label className="w-96 inline-flex gap-5">
                                    <input type="checkbox" required={true} className="mt-1 bg-black/0 border-2" />
                                    <span className="text-sm">
                                    I confirm I have full ownership rights to the music I am submitting and
                                    all samples therein and accept and bear responsibility for breaking this rule.
                                </span>
                                </label>
                                <div className="flex flex-col items-center">
                                    <button type="submit" disabled={!file}
                                            className={`py-2 px-5 rounded-xl
                                                       disabled:text-black/10 disabled:cursor-not-allowed
                                                       bg-black/10 ${ uploading && 'animate-pulse' }`}>
                                        Submit
                                    </button>
                                    {uploadFailed && <sub className="mt-2.5 text-red-500">Upload failed</sub>}
                                </div>
                            </div>
                        </form>
                        :
                        <Link href="/">back to home</Link>
                    }


                </div>
            </main>
        </>
    )
}
