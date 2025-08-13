import Link from "next/link";

export default function BookCard({ book }: { book: any }) {
    const coverUrl = book.formats?.["image/jpeg"] || "/placeholder.png";
    const authors =
        book.authors?.map((a: any) => a.name).join(", ") || "Unknown Author";

    return (
        <Link href={`/books/${book.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:ring-4 hover:ring-indigo-400 dark:hover:ring-indigo-300 transition w-full flex flex-col border border-gray-200 dark:border-gray-700">
                <img
                    src={coverUrl}
                    alt={book.title}
                    className="h-48 object-cover w-full bg-gray-100 dark:bg-gray-700"
                />
                <div className="p-4 flex flex-col gap-1">
                    <div className="font-bold text-lg truncate text-gray-900 dark:text-gray-100">
                        {book.title}
                    </div>
                    <div className="text-sm truncate text-gray-500 dark:text-gray-400">
                        {authors}
                    </div>
                    <div className="text-xs mt-1 text-indigo-600 dark:text-indigo-300">
                        ID: {book.id}
                    </div>
                </div>
            </div>
        </Link>
    );
}
