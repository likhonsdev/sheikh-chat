import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react'
import { sandpackDark } from '@codesandbox/sandpack-themes'

interface CodePreviewProps {
  code: string
  template?: 'react' | 'vanilla'
  theme?: 'light' | 'dark'
}

export function CodePreview({
  code,
  template = 'react',
  theme = 'dark',
}: CodePreviewProps) {
  const files = {
    '/App.tsx': code,
  }

  if (template === 'react') {
    files['/index.tsx'] = `
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`
  }

  return (
    <SandpackProvider
      template={template}
      theme={theme === 'dark' ? sandpackDark : undefined}
      files={files}
    >
      <SandpackLayout>
        <SandpackCodeEditor showTabs showLineNumbers closableTabs />
        <SandpackPreview showNavigator />
      </SandpackLayout>
    </SandpackProvider>
  )
}
