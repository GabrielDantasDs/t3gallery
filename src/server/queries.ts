"use server"; 
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { and, eq, sql } from "drizzle-orm";
import { numeric, pgTable, serial } from "drizzle-orm/pg-core";
import { revalidatePath } from "next/cache";
import { RedirectType, permanentRedirect, redirect } from "next/navigation";
import { db } from "~/server/db";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });
  
  return images;
}

export async function getMyImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, id),
    orderBy: (model, { desc }) => desc(model.id),
  });

  if (!image) throw new Error("Image not found");
  
  if (image.userId !== user.userId) throw new Error("Unauthorized");
  
  return image;
}

export async function deleteMyImage(id: number) {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  await db.delete(images).where(and(eq(images.id, id), eq(images.userId, user.userId)));
 
  return true;

}
