"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface iAppProps {
  text: String;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

// we are using use client because we are using useForm hook which is from JS bundle so don't think that it is running on client side. it's just because of useForm hook

export function SubmitButton({ text, variant }: iAppProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full" variant={variant}>
          <Loader2 className="size-4 animate-spin mr-2" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full" variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}
