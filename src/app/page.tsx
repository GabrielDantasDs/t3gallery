import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await getMyImages();

  function Images() {
    return (
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {images.map((image, index) => (
          <div key={image.id} className="flex h-48 w-48 flex-col">
            <Link href={`/img/${image.id}`}>
              <Image
                src={image.url}
                alt={image.name}
                style={{ objectFit: "contain" }}
                width={480}
                height={480}
              />
            </Link>
            <div>{image.name}</div>
          </div>
        ))}
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
