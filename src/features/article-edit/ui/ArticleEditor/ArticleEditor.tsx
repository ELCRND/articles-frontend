import { useEditor, EditorContent } from "@tiptap/react";

import { Toolbar } from "../Toolbar/Toolbar";

import { getExtensions } from "../../config/tiptapExtensions";

import styles from "./ArticleEditor.module.scss";

export const ArticleEditor = () => {
  const editor = useEditor({
    extensions: getExtensions(),
    content: "<p>Начните печатать здесь...</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className={styles.textField} />
      <button
        onClick={() => {
          console.log(editor.getJSON());
        }}
      >
        123
      </button>
    </div>
  );
};
