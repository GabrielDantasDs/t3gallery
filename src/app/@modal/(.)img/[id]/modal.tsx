"use client";

import React, {
  type ElementRef,
  useEffect,
  useRef,
  useState,
  Suspense,
} from "react";
import { useRouter } from "next/navigation";
import { Modal as ReactModal } from "react-bootstrap";
import Loading from "./loading";

export function Modal({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log("teste");
  }, [children]);

  function onDismiss() {
    router.back();
  }

  function handleClose() {
    setShow(false);
    router.back();
  }

  return (
    <ReactModal show={show} onHide={handleClose} size="lg" centered>
      <ReactModal.Header closeButton>
        <ReactModal.Title>{title}</ReactModal.Title>
      </ReactModal.Header>
      <ReactModal.Body>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <button onClick={onDismiss} className="close-button" />
      </ReactModal.Body>
    </ReactModal>
  );
}
