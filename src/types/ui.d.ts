// src/types/ui.d.ts
import { ReactNode } from "react";
import { ChangeEvent, InputHTMLAttributes } from "react";
import { TextareaHTMLAttributes } from "react";

export interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface TextareaWithLabelProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}
