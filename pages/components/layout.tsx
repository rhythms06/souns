import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children } : { children: React.ReactNode }) {
    return (
        <div className={inter.className}>
            <div>{ children }</div>
        </div>
    )
}