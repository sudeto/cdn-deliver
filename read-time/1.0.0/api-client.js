function calculateMetrics(content) {
    const wordsArray = content.split(/\s+/).filter(word => word.length > 0);

    const characterCount = content.replace(/\s+/g, "").length;
    const wordCount = wordsArray.length;
    const spaceCount = (content.match(/\s/g) || []).length;

    return { characterCount, wordCount, spaceCount };
}

async function fetchReadTime(metrics){

    const response = await fetch("http://127.0.0.1:3000/api/read-time/v1", {
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

    const data = await response.json();
    return data.estimated_read_time;
}

