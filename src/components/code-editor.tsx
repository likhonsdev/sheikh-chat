import { useEffect, useState } from 'react'
import { EditorView, basicSetup } from 'codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

interface CodeEditorProps {
  initialCode?: string
  onChange?: (code: string) => void
  language?: 'javascript' | 'typescript'
  readOnly?: boolean
}

export function CodeEditor({
  initialCode = '',
  onChange,
  language = 'typescript',
  readOnly = false,
}: CodeEditorProps) {
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!editorRef) return

    const startState = EditorView.updateListener.of((update) => {
      if (update.docChanged && onChange) {
        onChange(update.state.doc.toString())
      }
    })

    const view = new EditorView({
      doc: initialCode,
      extensions: [
        basicSetup,
        javascript({ typescript: language === 'typescript' }),
        oneDark,
        EditorView.editable.of(!readOnly),
        startState,
      ],
      parent: editorRef,
    })

    return () => {
      view.destroy()
    }
  }, [editorRef, initialCode, language, onChange, readOnly])

  return (
    <div 
      ref={setEditorRef} 
      className="w-full h-full min-h-[200px] overflow-auto rounded-md border"
    />
  )
}
