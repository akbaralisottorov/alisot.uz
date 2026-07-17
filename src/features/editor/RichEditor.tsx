import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, Italic, Heading1, Heading2, Heading3, 
  TextQuote, Code, Link as LinkIcon, Image as ImageIcon, 
  Undo, Redo 
} from 'lucide-react';
import { useEffect } from 'react';

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichEditor({ content, onChange, placeholder = "Maqola matnini bu yerga yozing..." }: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-2xl max-w-full my-6 border border-border/40 shadow-sm mx-auto'
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline cursor-pointer'
        }
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: 'is-editor-empty',
      })
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert focus:outline-none min-h-[400px] max-w-none text-foreground leading-relaxed p-6'
      }
    }
  });

  // Sync content when it changes outside (e.g. on load)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').url;
    const url = window.prompt('Havola (Link) URL manzilini kiriting:', previousUrl);
    
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Rasm (Image) URL manzilini kiriting:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const ButtonBar = ({ onClick, isActive, children, title }: any) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-colors hover:bg-input/60 cursor-pointer ${isActive ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full bg-card/40 border border-border/60 rounded-2xl overflow-hidden backdrop-blur-sm focus-within:border-primary/50 transition-colors">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-input/20 border-b border-border/40">
        <ButtonBar 
          onClick={() => editor.chain().focus().toggleBold().run()} 
          isActive={editor.isActive('bold')} 
          title="Qalin (Bold)"
        >
          <Bold className="w-4 h-4" />
        </ButtonBar>
        
        <ButtonBar 
          onClick={() => editor.chain().focus().toggleItalic().run()} 
          isActive={editor.isActive('italic')} 
          title="Yotiq (Italic)"
        >
          <Italic className="w-4 h-4" />
        </ButtonBar>

        <div className="w-[1px] h-6 bg-border/60 mx-1" />

        <ButtonBar 
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} 
          isActive={editor.isActive('heading', { level: 1 })} 
          title="Sarlavha 1 (H1)"
        >
          <Heading1 className="w-4 h-4" />
        </ButtonBar>

        <ButtonBar 
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
          isActive={editor.isActive('heading', { level: 2 })} 
          title="Sarlavha 2 (H2)"
        >
          <Heading2 className="w-4 h-4" />
        </ButtonBar>

        <ButtonBar 
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
          isActive={editor.isActive('heading', { level: 3 })} 
          title="Sarlavha 3 (H3)"
        >
          <Heading3 className="w-4 h-4" />
        </ButtonBar>

        <div className="w-[1px] h-6 bg-border/60 mx-1" />

        <ButtonBar 
          onClick={() => editor.chain().focus().toggleBlockquote().run()} 
          isActive={editor.isActive('blockquote')} 
          title="Iqtibos (Quote)"
        >
          <TextQuote className="w-4 h-4" />
        </ButtonBar>

        <ButtonBar 
          onClick={() => editor.chain().focus().toggleCode().run()} 
          isActive={editor.isActive('code')} 
          title="Kod (Code)"
        >
          <Code className="w-4 h-4" />
        </ButtonBar>

        <ButtonBar 
          onClick={setLink} 
          isActive={editor.isActive('link')} 
          title="Havola (Link)"
        >
          <LinkIcon className="w-4 h-4" />
        </ButtonBar>

        <ButtonBar 
          onClick={addImage} 
          isActive={editor.isActive('image')} 
          title="Rasm qo'shish (Image)"
        >
          <ImageIcon className="w-4 h-4" />
        </ButtonBar>

        <div className="w-[1px] h-6 bg-border/60 mx-1 ml-auto" />

        <ButtonBar 
          onClick={() => editor.chain().focus().undo().run()} 
          title="Orqaga (Undo)"
        >
          <Undo className="w-4 h-4" />
        </ButtonBar>

        <ButtonBar 
          onClick={() => editor.chain().focus().redo().run()} 
          title="Oldinga (Redo)"
        >
          <Redo className="w-4 h-4" />
        </ButtonBar>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
