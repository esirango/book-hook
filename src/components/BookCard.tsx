import Link from "next/link";

export default function BookCard({ book }: { book: any }) {
    const coverId = book.cover_i;
    const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
        : "/placeholder.png";

    return (
        <Link href={`/books/${book.key.replace("/works/", "")}`}>
            <div className="bg-white dark:bg-gray-800 rounded shadow p-4 hover:scale-105 transition flex flex-col">
                <img
                    src={coverUrl}
                    alt={book.title}
                    className="h-40 object-cover mb-2 rounded"
                />
                <div className="font-bold">{book.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {book.author_name?.join(", ")}
                </div>
                <div className="text-xs mt-2">{book.first_publish_year}</div>
            </div>
        </Link>
    );
}
