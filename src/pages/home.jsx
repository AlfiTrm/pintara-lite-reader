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
    <div>
      <main>
        <h1>
          Daftar Buku
        </h1>

        {books.map(book => (
          <div key={book.id}>
            <Link href={`/book/${book.id}`}>
              <h2>{book.title}</h2>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}
