
import { getMyImage } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";
import { toast } from "sonner";
import { LoadingSpinnerSVG } from "~/utils/icons";
import { clerkClient } from "@clerk/nextjs/server";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id"); 

  return getMyImage(idAsNumber).then((res) => {
    return <Modal title={res.name}><FullPageImageView id={idAsNumber}/></Modal>;
  })
}