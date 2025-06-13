import { smoothStream, streamText } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createDocumentHandler } from "@/lib/artifacts/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export const customDocumentHandler = createDocumentHandler<"custom">({
  kind: "custom",
  
  onCreateDocument: async ({ title, dataStream }) => {
    let draftContent = "";
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContentStream({
      contents: [{
        role: "user",
        parts: [`Generate a creative piece based on the title: ${title}`]
      }]
    });

    for await (const chunk of result.stream) {
      const text = chunk.text();
      draftContent += text;
      dataStream.writeData({
        type: "content-update",
        content: text,
      });
    }

    return draftContent;
  },

  onUpdateDocument: async ({ document, description, dataStream }) => {
    let draftContent = "";
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContentStream({
      contents: [{
        role: "user",
        parts: [`Update the following content based on this description: ${description}\n\nCurrent content:\n${document.content}`]
      }]
    });

    for await (const chunk of result.stream) {
      const text = chunk.text();
      draftContent += text;
      dataStream.writeData({
        type: "content-update",
        content: text,
      });
    }

    return draftContent;
  },
});
