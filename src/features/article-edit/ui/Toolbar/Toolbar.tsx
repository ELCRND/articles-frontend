"use client";

import React from "react";

import type { Editor } from "@tiptap/react";
import { BoldControl } from "../Controls/BoldControl";
import { ItalicControl } from "../Controls/ItalicControl";
import { UnderlineControl } from "../Controls/UnderlineControl";
import { FontSizeControl } from "../Controls/FontSizeControl";
import { ImageUploadControl } from "../Controls/ImageUploadControl";
import { OrderListControl } from "../Controls/OrderListControl";

import styles from "./Toolbar.module.scss";
import { BulletListControl } from "../Controls/BulletListControl";

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

  const handleOrderList = () =>
    editor.chain().focus().toggleOrderedList().run();

  const handleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();

  return (
    <div className={styles.toolbar}>
      <BoldControl handleCLick={handleBoldChange} />

      <ItalicControl handleCLick={handleItalicChange} />

      <UnderlineControl handleCLick={handleUnderlineChange} />

      <FontSizeControl handleChange={handleFontSizeChange} />

      <ImageUploadControl handleChange={handleImageUpload} />

      <BulletListControl handleCLick={handleBulletList} />

      <OrderListControl handleCLick={handleOrderList} />
    </div>
  );
}
