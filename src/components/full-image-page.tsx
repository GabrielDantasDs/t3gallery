import { clerkClient } from "@clerk/nextjs/server";
import { getMyImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getMyImage(props.id);

  const uploaderInfo = await clerkClient.users.getUser(image.userId);
  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex-shrink flex justify-center items-center">
      <img src={image.url} className="w-96 flex-shrink object-contain" />
      </div>

      <div className="flex w-48 flex-col flex-shrink-0 flex-col border-l">
        <div className="flex flex-col p-2">
          <span>
          Uploaded by: {uploaderInfo.fullName}
          </span>
        </div>
        <div className="flex flex-col p-2">
          <span>
          Created On: {new Date(image.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
