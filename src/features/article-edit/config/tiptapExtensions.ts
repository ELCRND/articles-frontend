import { FontSizeExtension } from "@/features/article-edit/lib/tiptap/font-size";
import BulletList from "@tiptap/extension-bullet-list";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

export const getExtensions = () => [
  StarterKit,
  Underline,
  TextStyle,
  FontSizeExtension,
  Image.configure({
    HTMLAttributes: {
      class: "max-w-full h-auto rounded-lg",
    },
  }),
  ListItem,
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc list-inside",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal list-inside",
    },
  }),
];
