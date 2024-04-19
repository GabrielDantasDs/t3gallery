
import { getMyImage } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";
import { toast } from "sonner";
import { LoadingSpinnerSVG } from "~/utils/icons";
import { clerkClient } from "@clerk/nextjs/server";

export default async function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id"); 

  return getMyImage(idAsNumber).then( async (res) => {
    const uploaderInfo = await clerkClient.users.getUser(res.userId);

    return <Modal title={res.name}>
      <FullPageImageView image={{...res, userName: uploaderInfo.fullName}}/>
      </Modal>;
  })
}