import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type Props = {
  content: Record<string, any>;
};

export const FormattedText = ({ content }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editable: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return <EditorContent editor={editor} />;
};
