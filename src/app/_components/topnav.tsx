"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div className="flex justify-between items-center">
        <img src="logo-sem-fundo.png" width={96} height={96}/>
        <span>Gallery</span>
      </div>
      <div className="flex flex-row items-center gap-4">
        <SignedIn>
          <SimpleUploadButton />
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
}
