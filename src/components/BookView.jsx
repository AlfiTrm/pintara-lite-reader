import React from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";


const BookView = ({ book, currentPage, handleNextPage, handlePrevPage, imageError, setImageError }) => {
    const activePage = book.pages.find(p => p.page === currentPage);

    return (
        <main className="flex flex-col items-center gap-4 md:w-6/12">
            {imageError ? (
                <div className="bg-red-50 p-4 w-1/3 h-[60vh] place-content-center rounded-lg text-center shadow">
                    <h2 className="font-semibold text-red-700">Halaman belum diunduh.</h2>
                    <p className="text-sm">Coba online untuk melihat konten ini.</p>
                </div>
            ) : (
                <div className="relative w-full max-w-3xl">
                    <img
                        src={activePage?.image}
                        alt={`Halaman ${currentPage} dari ${book.title}`}
                        className="shadow w-full sm:object-contain object-cover h-[70vh] rounded-xl"
                        onError={() => setImageError(true)}
                    />

                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="absolute left-1/20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-purple-800 text-white hover:bg-purple-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === book.pages.length}
                        className="absolute right-1/20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-purple-800 text-white hover:bg-purple-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                    >
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>
            )}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-purple-800 transition-all duration-300"
                    style={{ width: `${(currentPage / book.pages.length) * 100}%` }}
                />
            </div>
        </main>
    )
}

export default BookView
