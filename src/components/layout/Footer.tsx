export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-white py-5 mt-12">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                <span className="font-semibold text-lg">Book Library</span>
                <span className="text-sm mt-2 sm:mt-0">
                    © {new Date().getFullYear()} All rights reserved.
                </span>
            </div>
        </footer>
    );
}
