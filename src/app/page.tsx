import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";
export const dynamic = "force-dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense } from "react";
import Loading from "./@modal/(.)img/[id]/loading";

export default async function HomePage() {
  const images = await getMyImages();

  function Images() {
    return (
      <div className="container pt-2">
        <div className="grid grid-cols-6 gap-3 p-4">
          {images.map((image, index) => (
            <div key={image.id} className="flex h-64 w-48 flex-col border-1 border-solid rounded-lg shadow-xl p-3 transform transition duration-500 hover:scale-110">
              <Link href={`/img/${image.id}`}>
                <Image
                  src={image.url}
                  alt={image.name}
                  style={{ width: "192px", height: "192px" }}
                  width={480}
                  height={480}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please Sign In, to access gallery
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
