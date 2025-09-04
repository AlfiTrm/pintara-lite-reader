import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookPage() {
    const router = useRouter()
    const { id } = router.query
    const [book, setBook] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [imageError, setImageError] = useState(false)

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
            <div>Sedang Memproses..</div>
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
        <main>
            <h1>{book.title}</h1>

            <div>
                {imageError ? (
                    <div>
                        <h2>Halaman belum diunduh. Coba online.</h2>
                    </div>
                ) : (

                    <img src={activePage?.image}
                        alt={`Halaman ${currentPage} dari ${book.title}`}
                        width={500}
                        onError={() => setImageError(true)}
                    />
                )}
            </div>

            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Sebelumnya
                </button>
                <span> Halaman {currentPage} / {book.pages.length} </span>
                <button onClick={handleNextPage} disabled={currentPage === book.pages.length}>
                    Selanjutnya
                </button>
            </div>
        </main>
    )
}