"use client";

import { Spinner } from "@material-tailwind/react";

export default function Loading() {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-center">
        <Spinner className="h-20 w-20 text-primary" />
      </div>
    </div>
  );
}
