"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TextAreaWithLabelProps = {
  label: string;
  htmlForAndId: string;
  placeholder: string;
  isDisable: boolean;
  handleOnChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
};
export function TextAreaWithLabel({
  label,
  htmlForAndId,
  placeholder,
  isDisable,
  handleOnChange,
  value,
}: TextAreaWithLabelProps) {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor={htmlForAndId}>{label}</Label>
      <Textarea
        placeholder={placeholder}
        id={htmlForAndId}
        disabled={isDisable}
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
}
