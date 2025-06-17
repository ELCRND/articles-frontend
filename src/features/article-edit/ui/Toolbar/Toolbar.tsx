"use client";

import React from "react";

import type { Editor } from "@tiptap/react";
import { BoldControl } from "../Controls/BoldControl";
import { ItalicControl } from "../Controls/ItalicControl";
import { UnderlineControl } from "../Controls/UnderlineControl";
import { FontSizeControl } from "../Controls/FontSizeControl";
import { ImageUploadControl } from "../Controls/ImageUploadControl";

import styles from "./Toolbar.module.scss";

type Props = {
  editor: Editor;
};

export function Toolbar({ editor }: Props) {
  const handleBoldChange = () => editor.chain().focus().toggleBold().run();
  const handleItalicChange = () => editor.chain().focus().toggleItalic().run();
  const handleUnderlineChange = () =>
    editor.chain().focus().toggleUnderline().run();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFontSizeChange = (value: string) => {
    if (value === "default") {
      editor.chain().focus().unsetFontSize().run();
    } else {
      editor.chain().focus().setFontSize(value).run();
    }
  };

  return (
    <div className={styles.toolbar}>
      <BoldControl handleCLick={handleBoldChange} />

      <ItalicControl handleCLick={handleItalicChange} />

      <UnderlineControl handleCLick={handleUnderlineChange} />

      <FontSizeControl handleChange={handleFontSizeChange} />

      <ImageUploadControl handleChange={handleImageUpload} />

      {/* Списки */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        list
      </button>

      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        listO
      </button>
    </div>
  );
}
