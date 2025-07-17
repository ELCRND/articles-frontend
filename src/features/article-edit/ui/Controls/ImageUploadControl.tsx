import React, { useRef } from "react";

import styles from "./Controls.module.scss";

type Props = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ImageUploadControl = ({ handleChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={styles.imageUpload}>
      <button onClick={() => fileInputRef.current?.click()} type="button">
        <svg
          width="10"
          height="18"
          viewBox="0 0 10 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 14.5385V4.07692C9 3.26087 8.71905 2.47824 8.21895 1.90121C7.71885 1.32417 7.04058 1 6.33333 1H3.66667C2.95942 1 2.28115 1.32417 1.78105 1.90121C1.28095 2.47824 1 3.26087 1 4.07692V14.5385C1 15.1913 1.22476 15.8174 1.62484 16.279C2.02492 16.7407 2.56754 17 3.13333 17H4.2C4.7658 17 5.30842 16.7407 5.70849 16.279C6.10857 15.8174 6.33333 15.1913 6.33333 14.5385V5.30769C6.33333 4.98127 6.22095 4.66822 6.02091 4.43741C5.82088 4.20659 5.54956 4.07692 5.26667 4.07692H4.73333C4.45044 4.07692 4.17913 4.20659 3.97909 4.43741C3.77905 4.66822 3.66667 4.98127 3.66667 5.30769V12.0769"
            stroke="#E3E7D4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};
