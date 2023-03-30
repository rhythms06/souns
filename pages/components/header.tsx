import Link from "next/link";

export default function Header({ href } : { href: string }) {
    return (
        <header className="m-5 flex items-center">
            <Link href="/" className="text-xl">SOUNS</Link>
            <div className="grow flex justify-center gap-8 sm:gap-12 md:gap-24">
                <Link href="/submit" className={`${href == '/submit' && 'text-slate-500'} hover:text-slate-500`}>Submit</Link>
                <Link href="/" className="hover:text-slate-500 cursor-not-allowed">Vote</Link>
                <Link href="/" className="hover:text-slate-500 cursor-not-allowed">Auction</Link>
            </div>
            <a className="sm:hidden cursor-not-allowed">Connect</a>
            <a className="hidden sm:block cursor-not-allowed">Connect Wallet</a>
        </header>
    )
}