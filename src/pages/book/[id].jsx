import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../../components/Layout";
import { Home } from "lucide-react";
import BookView from "../../components/BookView";

export default function BookPage() {
    const router = useRouter()
    const { id } = router.query
    const [book, setBook] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [imageError, setImageError] = useState(false)
    const [isOnline, setIsOnline] = useState(true)

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

    useEffect(() => {
        const handleOnline = () => setIsOnline(true)
        const handleOffline = () => setIsOnline(false)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    if (!book) {
        return (
            <div><Loading /></div>
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


    return (
        <div className="min-h-screen bg-white text-black">
            <div className="flex flex-col items-center justify-center p-4">

                <header className="w-full max-w-2xl flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-sm">
                        <Link href="/home">
                            <div className="p-2 shadow shadow-gray-300 hover:bg-gray-100 transition-all rounded-full text-purple-1">
                                <Home />
                            </div>
                        </Link>
                        <h1 className="text-md font-semibold">
                            {book.title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`${isOnline ? "" : "bg-red-700"}  px-3 py-1 text-sm rounded-xl font-semibold text-white`}>
                            {isOnline ? "" : "Offline"}
                        </span>
                        <span className="font-semibold text-gray-500 text-sm px-4 mt-2">
                            <span className="text-purple-1 mr-1.5">
                                {currentPage}
                            </span>
                            / {book.pages.length}
                        </span>
                    </div>
                </header>

                <main>
                    <BookView
                        book={book}
                        currentPage={currentPage}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                        imageError={imageError}
                        setImageError={setImageError}
                    />
                </main>
            </div>
        </div>
    )
}