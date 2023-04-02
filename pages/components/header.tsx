import Link from "next/link";
import { HiOutlineWallet } from "react-icons/hi2";

export default function Header({ href } : { href: string }) {
    return (
        <header className="m-5 flex items-center">
            <Link href="/" className="sm:hidden text-xl">
                <svg width="21" height="28" viewBox="0 0 45 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41.7872 0H21.6691C19.4963 0 17.9502 2.1108 18.6069 4.18076L32.3644 47.5511C32.4723 47.891 32.0281 48.127 31.8065 47.8475L22.9185 36.6421C21.9954 35.4784 20.3941 35.0992 19.0467 35.7253L1.85887 43.7122C-0.0138282 44.5824 -0.590224 46.9672 0.678514 48.5958L9.37727 59.7618C9.98592 60.5431 10.9213 61 11.912 61H41.1671C43.2854 61 44.8238 58.9869 44.2663 56.9446L31.8031 11.2822C31.3004 9.44038 32.6877 7.625 34.598 7.625C36.0146 7.625 37.2234 8.64882 37.4557 10.0454L37.7364 11.7325C38.3486 15.4119 43.6894 15.2652 44.0984 11.5576L44.9803 3.56231C45.19 1.66143 43.7007 0 41.7872 0Z" fill="black"/>
                </svg>
            </Link>
            <Link href="/" className="hidden sm:flex gap-3 text-xl">
                <svg width="21" height="28" viewBox="0 0 45 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M41.7872 0H21.6691C19.4963 0 17.9502 2.1108 18.6069 4.18076L32.3644 47.5511C32.4723 47.891 32.0281 48.127 31.8065 47.8475L22.9185 36.6421C21.9954 35.4784 20.3941 35.0992 19.0467 35.7253L1.85887 43.7122C-0.0138282 44.5824 -0.590224 46.9672 0.678514 48.5958L9.37727 59.7618C9.98592 60.5431 10.9213 61 11.912 61H41.1671C43.2854 61 44.8238 58.9869 44.2663 56.9446L31.8031 11.2822C31.3004 9.44038 32.6877 7.625 34.598 7.625C36.0146 7.625 37.2234 8.64882 37.4557 10.0454L37.7364 11.7325C38.3486 15.4119 43.6894 15.2652 44.0984 11.5576L44.9803 3.56231C45.19 1.66143 43.7007 0 41.7872 0Z" fill="black"/>
                </svg>
                <p>SOUNS</p>
            </Link>
            <div className="grow flex justify-center gap-8 sm:gap-16 md:gap-24">
                <Link href="/submit" className={`${href == '/submit' && 'text-slate-500'} hover:text-slate-500`}>Submit</Link>
                <Link href="/vote" className={`${href == '/vote' && 'text-slate-500'} hover:text-slate-500`}>Vote</Link>
                <Link href="/" className="hover:text-slate-500 cursor-not-allowed">Auction</Link>
            </div>
            <a className="sm:hidden cursor-not-allowed">
                <HiOutlineWallet size={28} />
            </a>
            <a className="hidden sm:block cursor-not-allowed">Connect Wallet</a>
        </header>
    )
}