import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MoveRight } from "lucide-react";

export default function Home() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/books.json')
      const data = await response.json()
      setBooks(data)
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto py-12 px-4">
        <header className="text-4xl md:text-6xl lg:text-8xl text-center font-black bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent mt-4">
          <h1>
            KOLEKSI BUKU
          </h1>
        </header>

        <main className="grid grid-cols-2 gap-4 md:gap-8 mt-10">
          {books.map(book => (
            <Link key={book.id} href={`/book/${book.id}`}>
              <div className="group bg-white ring-1 ring-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden">

                <div className="overflow-hidden">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{book.title}</h2>

                  <p className="text-sm text-gray-500 flex-grow mb-4">
                    {book.descriptions}
                  </p>

                  <div className="mt-auto flex text-sm items-center gap-2 group text-purple-800 font-semibold group-hover: self-start">
                    Baca Sekarang
                    <span className="group-hover:visible invisible transition-all duration-300 text-white group-hover:text-purple-800"> <MoveRight /></span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </main>
      </div>
    </div>
  )
}
