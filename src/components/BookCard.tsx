export default function BookCard({ book }: { book: any }) {
    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "/placeholder-cover.png"; // یه عکس پیش‌فرض در public بذار

    return (
        <div className="border rounded-lg shadow p-4 bg-white flex flex-col">
            <img
                src={coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="font-bold text-lg mb-2">
                {book.title || "Untitled"}
            </h3>
            <div className="text-sm text-gray-600 mb-2">
                {book.author_name?.join(", ") || "Unknown author"}
            </div>
            <div className="text-xs text-gray-500 mb-2">
                {book.first_publish_year
                    ? `Published: ${book.first_publish_year}`
                    : ""}
            </div>
            <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-indigo-600 hover:underline"
            >
                More details
            </a>
        </div>
    );
}
