export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    return name
        .split(" ")
        .filter(Boolean) // Removes any extra spaces
        .slice(0, 2) // Take only the first two words
        .map(word => word[0].toUpperCase()) // Get the first letter of each word and capitalize
        .join(""); // Combine the initials
};