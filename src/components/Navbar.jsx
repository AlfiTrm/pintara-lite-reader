import { Github } from "lucide-react";
import Link from "next/link";
import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-1 to-purple-1 text-white shadow">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <Link href={"/home"}>
                        <p className="text-lg sm:text-xl font-bold hover:animate-pulse transition-all">
                            <span className="hidden sm:inline">Pintara Lite Reader</span>
                            <span className="sm:hidden">Pintara</span>
                        </p>
                    </Link>

                    <Link href="https://github.com/AlfiTrm/pintara-lite-reader" className="p-2  hover:bg-purple-2  transition-all rounded-full duration-300">
                        <Github />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar