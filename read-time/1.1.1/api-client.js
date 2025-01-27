function calculateMetrics(content) {
    const wordsArray = content.split(/\s+/).filter(word => word.length > 0);

    const characterCount = content.replace(/\s+/g, "").length;
    const wordCount = wordsArray.length;
    const spaceCount = (content.match(/\s/g) || []).length;

    return { characterCount, wordCount, spaceCount };
}

async function fetchReadTime(metrics) {
    try {
        const response = await fetch("https://sudeto-services.onrender.com/api/read-time/v", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                character_count: metrics.characterCount,
                word_count: metrics.wordCount,
                space_count: metrics.spaceCount,
            }),
        });

        // Check if the response is OK (HTTP status 200–299)
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();

        // Validate the response data structure
        if (!data || typeof data.estimated_read_time !== "number") {
            throw new Error("Invalid response format from the server.");
        }

        return data.estimated_read_time;
    } catch (error) {
        console.error("Error fetching read time:", error.message);
        // Return a default value
        return 0;
    }
}
