import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import Color from '@tiptap/extension-color'
import MenuBar from '@/app/components/ui/MenuBar'
import LinkDialog from '@/app/components/ui/LinkDialog'
import Link from '@tiptap/extension-link'
const lowlight = createLowlight(common)

const RichTextEditor = ({ content, onChange }) => {
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      TextStyle,
      Color,
      Underline,
      
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const handleLinkSubmit = ({ url, text }) => {
    if (editor) {
      if (editor.state.selection.empty) {
        // If no text is selected, insert new text with link
        editor
          .chain()
          .focus()
          .insertContent(text)
          .setTextSelection({ from: editor.state.selection.from - text.length, to: editor.state.selection.from })
          .setLink({ href: url })
          .run()
      } else {
        // If text is selected, convert it to a link
        editor
          .chain()
          .focus()
          .setLink({ href: url })
          .run()
      }
    }
  }

  return (
    <div className="border rounded-md p-2">
      <MenuBar 
        editor={editor} 
        onOpenLinkDialog={() => setIsLinkDialogOpen(true)} 
      />
      <EditorContent 
        editor={editor} 
        className="min-h-[300px] prose max-w-none border p-4 rounded-md" 
      />
      <LinkDialog
        isOpen={isLinkDialogOpen}
        onClose={() => setIsLinkDialogOpen(false)}
        onSubmit={handleLinkSubmit}
      />
    </div>
  )
}

export default RichTextEditor