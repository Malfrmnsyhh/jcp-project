/**
 * Inisial untuk avatar fallback, mis. "Budi Santoso" -> "BS".
 */
export function getInitials(name) {
    if (!name) return 'A';

    const parts = name.trim().split(/\s+/);

    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    return name.substring(0, 2).toUpperCase();
}
