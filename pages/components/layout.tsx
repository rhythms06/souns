import { Inter } from "next/font/google";
import Header from "./header";

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
    return (
        <div className={inter.className}>
            <Header />
            <div>{ children }</div>
        </div>
    )
}