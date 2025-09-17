const LANGUAGE_CODES: Record<string, string> = {
    English: "eng",
    French: "fre",
    German: "ger",
    Spanish: "spa",
    Japanese: "jpn",
    Persian: "per",
};

function mapPublishYearRange(range: string) {
    switch (range) {
        case "Before 1900":
            return "[* TO 1899]";
        case "1900-1950":
            return "[1900 TO 1950]";
        case "1951-2000":
            return "[1951 TO 2000]";
        case "2001-2010":
            return "[2001 TO 2010]";
        case "2011-2020":
            return "[2011 TO 2020]";
        case "2021-Present":
            return "[2021 TO *]";
        default:
            return "";
    }
}

function mapCentury(century: string) {
    switch (century) {
        case "17th Century":
            return "[1601 TO 1700]";
        case "18th Century":
            return "[1701 TO 1800]";
        case "19th Century":
            return "[1801 TO 1900]";
        case "20th Century":
            return "[1901 TO 2000]";
        case "21st Century":
            return "[2001 TO *]";
        default:
            return "";
    }
}

export function buildOpenLibraryQuery(filters: Record<string, string>) {
    const parts: string[] = [];

    if (filters.title) parts.push(`title:"${filters.title}"`);
    if (filters.author) parts.push(`author:"${filters.author}"`);
    if (filters.genre) parts.push(`subject:"${filters.genre}"`);
    if (filters.publishYear) {
        const range = mapPublishYearRange(filters.publishYear);
        if (range) parts.push(`first_publish_year:${range}`);
    }
    if (filters.time) {
        const centuryRange = mapCentury(filters.time);
        if (centuryRange) parts.push(`first_publish_year:${centuryRange}`);
    }

    if (filters.language) {
        const code = LANGUAGE_CODES[filters.language];
        if (code) parts.push(`language:${code}`);
    }

    return parts.join(" ");
}
