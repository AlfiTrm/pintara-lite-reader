import { useEffect, useState } from "react";
import Link from "next/link";

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
    <div className="min-h-screen bg-slate-50 overflow-hidden">
      <main className="">
        <h1 className="text-3xl text-center font-black bg-gradient-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent drop-shadow-md mt-10">
          KOLEKSI BUKU
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center mt-10 px-8">
          {books.map(book => (
            <div key={book.id} className="text-center text-xl font-semibold  p-4 rounded-xl text-white ">
              <Link href={`/book/${book.id}`}>
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-101 transition p-4 w-72 text-center">
                  <img src={book.thumbnail}
                    alt={book.title}
                    className="rounded-md w-full h-auto transition-transform" />
                  <h2 className="mt-3 font-semibold text-black">{book.title}</h2>
                </div>

              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
