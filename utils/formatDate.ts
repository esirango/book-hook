export function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const parts = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).formatToParts(date);

    const day = parts.find((p) => p.type === "day")?.value;
    const month = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;

    return `${month} ${day} ${year}`;
}
