export default async function handler(req, res) {
    try {
        const sources = [
            "https://www.reddit.com/r/Entrepreneur/new.json?limit=10",
            "https://www.reddit.com/r/SideProject/new.json?limit=10",
            "https://www.reddit.com/r/startups/new.json?limit=10"
        ];

        const results = [];

        for (const url of sources) {
            try {
                const response = await fetch(url, {
                    headers: {
                        "User-Agent": "MoneyHunterAI/1.0"
                    }
                });

                if (!response.ok) continue;

                const data = await response.json();

                for (const post of data?.data?.children || []) {
                    const item = post.data;

                    if (!item.title) continue;

                    results.push({
                        title: item.title,
                        problem: item.selftext
                            ? item.selftext.slice(0, 300)
                            : "منشور يناقش مشكلة أو فكرة يمكن تحليلها.",
                        score: Math.min(
                            100,
                            Math.max(
                                50,
                                Math.round(
                                    50 +
                                    Math.log10(
                                        Math.max(item.score || 1, 1)
                                    ) * 15
                                )
                            )
                        ),
                        source: "Reddit",
                        url: `https://www.reddit.com${item.permalink}`
                    });
                }
            } catch (error) {
                console.error("Source error:", error);
            }
        }

        const unique = [];
        const seen = new Set();

        for (const opportunity of results) {
            const key = opportunity.title.toLowerCase();

            if (!seen.has(key)) {
                seen.add(key);
                unique.push(opportunity);
            }
        }

        unique.sort((a, b) => b.score - a.score);

        res.status(200).json({
            success: true,
            count: unique.length,
            opportunities: unique.slice(0, 20)
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            error: "فشل جمع الفرص"
        });
    }
}
