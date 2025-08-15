"use client";

import { useState } from "react";
import { Button } from "../ui/button";

type CopyToClipboardButtonProps = {
  textToCopy: string;
  visibility: boolean;
};

export default function CopyToClipboardButton({
  textToCopy,
  visibility,
}: CopyToClipboardButtonProps) {
  const [copied, setCopied] = useState<boolean>();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy text: ", e);
    }
  };

  return (
    <Button
      className="w-full"
      onClick={handleCopy}
      aria-label="Copy to clipboard!"
      disabled={visibility}
    >
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}
