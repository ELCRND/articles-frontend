"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";

import { Toolbar } from "../Toolbar/Toolbar";
import { getExtensions } from "../../config/tiptapExtensions";

import styles from "./ArticleEditor.module.scss";

type Props = {
  onChange?: (content: Record<string, any>) => void;
  className?: string;
};

export const ArticleEditor = ({ onChange, className }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const editor = useEditor({
    extensions: getExtensions(),
    content: "<p>Начните печатать здесь...</p>",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [editor]);

  if (!editor) {
    return (
      <div className={`${styles.editor} ${className}`}>
        <div className={`${styles.skeletonContainer} ${styles.pulsing}`}></div>
      </div>
    );
  }

  return (
    <div className={`${styles.editor} ${className}`}>
      {isLoading ? (
        <div className={`${styles.skeletonContainer} ${styles.pulsing}`}></div>
      ) : (
        <>
          <label htmlFor="" className={styles.label}>
            Текст
          </label>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} className={styles.textField} />
        </>
      )}
    </div>
  );
};
