const express = require("express");
require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(express.static("public")); // serves your form.html & client.js

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: process.env.MODEL || "gemini-1.5-flash"
});

// ---------------------
// API Route (Frontend → AI)
// ---------------------
app.post("/generate-report", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data) return res.status(400).send("Missing form data");

        const prompt = buildPrompt(data);

        // Gemini API call
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const report = response.text();

        res.json({ report });
    } catch (err) {
        console.error("Gemini Error:", err);
        res.status(500).send("Gemini Error: " + err.message);
    }
});

// ---------------------
// Prompt Generator
// ---------------------
function buildPrompt(data) {
    return `
You are a certified child behavioral psychologist. Create a structured, professional assessment report
based on the inputs below.

==========================
PARENT INFORMATION
Name: ${data.parent.name}
Email: ${data.parent.email}
Contact: ${data.parent.contact}

==========================
CHILD INFORMATION
Name: ${data.child.name}
Age: ${data.child.age}
Gender: ${data.child.gender}
Daily Screen Time: ${data.child.screenTime}

==========================
OBSERVED BEHAVIORS
${data.observed.length > 0 ? data.observed.join(", ") : "None selected"}

==========================
MAIN CONCERNS REPORTED BY PARENT
${data.concerns}

==========================
ADDITIONAL NOTES
${data.notes || "None"}

==========================
TASK:
Write a well-structured, easy-to-understand child assessment report containing:
1. Parent + child details (verification header)
2. Summary of the child’s phone usage behavior
3. Detailed psychological & behavioral analysis
4. Potential risks if patterns continue
5. 4–6 useful recommendations for parents
6. Supportive, non-judgmental tone
7. Use headings + bullet points

Respond with ONLY the final report — no explanations.
`;
}

// ---------------------
// Server Listen
// ---------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
