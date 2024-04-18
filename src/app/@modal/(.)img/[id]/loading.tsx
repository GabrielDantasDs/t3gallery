import { Modal } from "react-bootstrap";
import { LoadingSpinnerSVG } from "~/utils/icons";

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className="flex-shrink flex justify-center items-center"><LoadingSpinnerSVG /></div>
      );
  }
