import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import NotFound from "../NotFound";

export default function BookPage() {
    const router = useRouter()
    const { id } = router.query
    const [book, setBook] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [imageError, setImageError] = useState(false)
    const [isOnline, setIsOnline] = useState(false)

    useEffect(() => {
        if (id) {
            async function fetchBookData() {
                const response = await fetch('/books.json')
                const allBook = await response.json()

                const foundBook = allBook.find(b => b.id === id)
                setBook(foundBook)
            }

            fetchBookData()
        }
    }, [id])

    useEffect(() => {
        setImageError(false)
    }, [currentPage])


    if (!book) {
        return (
            <div><NotFound /></div>
        )
    }

    const handleNextPage = () => {
        if (currentPage < book.pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const activePage = book.pages.find(p => p.page === currentPage);

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex flex-col items-center justify-center p-4">

                <header className="w-full max-w-2xl flex justify-between items-center mb-6">
                    <Link href="/home">
                        <p className=" font-semibold">
                            Kembali ke Daftar Buku
                        </p>
                    </Link>
                    <h1 className="text-lg  font-medium text-right">
                        {book.title}
                    </h1>
                </header>

                <main>
                    {imageError ? (
                        <div>
                            <h2>Halaman belum diunduh. Coba online.</h2>
                        </div>
                    ) : (

                        <img src={activePage?.image}
                            alt={`Halaman ${currentPage} dari ${book.title}`}
                            width={screen}
                            className="rounded-2xl"
                            onError={() => setImageError(true)}
                        />
                    )}
                </main>

                <div className="mt-6 flex items-center gap-4">
                    <button onClick={handlePrevPage} disabled={currentPage === 1} className="bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                        Sebelumnya
                    </button>
                    <span className="font-semibold tabular-nums"> Halaman {currentPage} / {book.pages.length} </span>
                    <button onClick={handleNextPage} disabled={currentPage === book.pages.length} className="bg-gray-200 hover:bg-gray-300 font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                        Selanjutnya
                    </button>
                </div>
            </div>
        </div>
    )
}