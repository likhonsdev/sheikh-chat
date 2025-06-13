# Sheikh Chat - AI-Powered Code Assistant

An advanced AI code assistant powered by Google Gemini Pro, featuring real-time code editing capabilities with CodeMirror/Monaco Editor integration and Sandpack for live code previews.

## 🚀 Features

- Real-time AI chat powered by Google Gemini Pro
- Live code editing with CodeMirror/Monaco Editor
- Interactive code previews using Sandpack
- Server-side streaming with Vercel AI SDK
- Modern UI with Tailwind CSS and shadcn/ui
- Fully responsive design
- TypeScript support
- Real-time code validation and syntax highlighting

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18
- **AI**: Google Gemini Pro, Vercel AI SDK
- **Code Editing**: CodeMirror 6, Monaco Editor
- **Code Preview**: Sandpack
- **Styling**: Tailwind CSS, shadcn/ui
- **Language**: TypeScript

## 🏃‍♂️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/likhonsdev/sheikh-chat.git
   cd sheikh-chat
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your Google Gemini API key to `.env.local`:
   ```
   GOOGLE_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Configuration

- Edit `tailwind.config.js` for theme customization
- Modify `src/app/api/chat/route.ts` for AI response handling
- Adjust `src/components` for UI components
- Configure CodeMirror/Monaco settings in their respective components

## 📝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for any purpose.

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Vercel for the AI SDK and hosting platform
- CodeSandbox for Sandpack
- All other open-source contributors