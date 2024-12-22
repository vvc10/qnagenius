import React, { useRef } from 'react';
import { Button } from "@/app/components/ui/button"
import {
  Bold, Italic, UnderlineIcon, Code2, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight, ImageIcon,
  Link as LinkIcon
} from 'lucide-react'
import ColorPicker from '@/app/components/ui/ColorPicker'

const MenuBar = ({ editor, onOpenLinkDialog }) => {
  const fileInputRef = useRef(null);

  if (!editor) return null;

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          editor.chain().focus().setImage({ src: content }).run();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-2 border-b pb-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-muted' : ''}>
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-muted' : ''}>
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-muted' : ''}>
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'bg-muted' : ''}>
        <Strikethrough className="h-4 w-4" />
      </Button>
      
      {/* Link Button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={onOpenLinkDialog}
        className={editor.isActive('link') ? 'bg-muted' : ''}>
        <LinkIcon className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" /> {/* Divider */}

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}>
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}>
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}>
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" /> {/* Divider */}

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-muted' : ''}>
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-muted' : ''}>
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" /> {/* Divider */}

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'bg-muted' : ''}>
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'bg-muted' : ''}>
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'bg-muted' : ''}>
        <AlignRight className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1" /> {/* Divider */}

      <Button
        size="icon"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'bg-muted' : ''}>
        <Code2 className="h-4 w-4" />
      </Button>

      <ColorPicker editor={editor} />

      <Button
        size="icon"
        variant="ghost"
        onClick={() => fileInputRef.current?.click()}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default MenuBar;