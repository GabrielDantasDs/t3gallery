import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });

  function Images() {
    return (
      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <main className="">
      <SignedOut><div className="h-full w-full text-2xl text-center">Please Sign In, to access gallery</div></SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
