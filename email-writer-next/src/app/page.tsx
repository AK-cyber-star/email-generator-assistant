"use client";

import CopyToClipboardButton from "@/components/customComponents/CopyToClipboardButton";
import { SelectTone } from "@/components/customComponents/SelectTone";
import { TextAreaWithLabel } from "@/components/customComponents/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";
import { FadeLoader } from "react-spinners";

type EmailContentType = {
  emailContent: string;
  tone: string;
};

async function generateResponse(
  emailContent: EmailContentType,
): Promise<string> {
  const response = await axios.post(
    "http://localhost:8080/api/email/generate",
    emailContent,
  );
  return response.data;
}

export default function Home() {
  const [originalEmail, setEmail] = useState<string>("");
  const [tone, setTone] = useState<string>("none");
  const [isResponseReady, setResponseReady] = useState<boolean>(false);
  const [isGenerateClicked, setGenerateClicked] = useState<boolean>(false);
  const [generatedResponse, setGeneratedResponse] = useState("");

  function handleEmailTextAreaOnChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) {
    setEmail(e.target.value);
  }

  async function onSubmitHandler(e: React.FormEvent) {
    e.preventDefault();
    setGenerateClicked(true);

    const payload: EmailContentType = {
      emailContent: originalEmail,
      tone: tone,
    };

    console.log("Email content: ", payload);

    const response = await generateResponse(payload);
    console.log("Email response: ", response);

    setGeneratedResponse(response);
    setResponseReady(!isResponseReady);

    setGenerateClicked(false);
  }

  return (
    <main className="min-h-screen flex justify-center mt-[4em]">
      <section className="relative flex gap-4 flex-col lg:w-[600px] md:w-[500px] sm:w-[400px] p-3">
        {isGenerateClicked && (
          <div
            className="absolute z-10 w-full min-h-[400px]
            flex items-center justify-center
            "
          >
            <FadeLoader
              color="black"
              height={5}
              width={5}
              radius={1}
              loading={isGenerateClicked}
            />
          </div>
        )}
        <div>
          <h1 className="text-5xl font-medium tracking-[-4px]">
            Email Generator
          </h1>
        </div>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <TextAreaWithLabel
            label="Enter the original email content"
            htmlForAndId="message"
            placeholder="Enter the original email content"
            isDisable={false}
            handleOnChange={handleEmailTextAreaOnChange}
          />
          <SelectTone setTone={setTone} />
          <Button type="submit" className="w-full">
            Generate
          </Button>

          {/* resoponse content container */}
          <TextAreaWithLabel
            label="Generated Reply"
            htmlForAndId="reply"
            placeholder="Generated reply"
            isDisable={!isResponseReady}
            value={generatedResponse}
          />
        </form>
        <CopyToClipboardButton
          textToCopy={generatedResponse || ""}
          visibility={!isResponseReady}
        />
      </section>
    </main>
  );
}
