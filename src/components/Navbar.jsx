import { Github } from "lucide-react";
import Link from "next/link";
import React from 'react'

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-blue-800 to-purple-600 text-white shadow">
            <div className="max-w-4xl mx-auto p-4 px-4 sm:px-6 md:px-8">
                <div className="flex items-center justify-between">
                    <Link href={"/home"}>
                        <p className="text-lg sm:text-xl font-bold hover:animate-pulse transition-all">
                            <span className="hidden sm:inline">Pintara Lite Reader</span>
                            <span className="sm:hidden">Pintara</span>
                        </p>
                    </Link>

                    <Link href="https://github.com/AlfiTrm/pintara-lite-reader" className="p-2 shadow-md hover:shadow-gray-300 hover:shadow-inner transition-shadow duration-1000 hover:animate-pulse hover:transition-shadow rounded-full">
                        <Github />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar