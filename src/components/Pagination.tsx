import React from "react";

interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
    totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    setPage,
    hasNextPage,
    totalPages,
}) => {
    const pagesToShow = 5;
    let startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (totalPages) {
        const total = Math.ceil(totalPages);
        endPage = Math.min(endPage, total);
        startPage = Math.max(1, endPage - pagesToShow + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    return (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-full bg-green-600 dark:bg-green-800 text-white font-semibold disabled:opacity-50 hover:bg-green-700 dark:hover:bg-green-700 transition-colors"
            >
                Previous
            </button>

            {pageNumbers.map((p) => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 rounded-full font-medium transition-colors ${
                        p === page
                            ? "bg-green-600 text-white dark:bg-green-800 dark:text-white"
                            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                >
                    {p}
                </button>
            ))}

            <button
                onClick={() => setPage(page + 1)}
                disabled={
                    totalPages ? page >= Math.ceil(totalPages) : !hasNextPage
                }
                className="px-4 py-2 rounded-full bg-green-600 dark:bg-green-800 text-white font-semibold disabled:opacity-50 hover:bg-green-700 dark:hover:bg-green-700 transition-colors"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
