const test = async (req, res) => {
    const { message } = req.body;
    const ollama = (await import("ollama")).default;

    try {
        const response = await ollama.chat({
            model: "llama3",
            messages: [
                { role: "user", content: message }
            ]
        });

        res.status(200).json({ reply: response.message.content });

    } catch (err) {
        res.status(500).json({ error: err.message });
        console.log(err)
    }

}

module.exports = { test };
