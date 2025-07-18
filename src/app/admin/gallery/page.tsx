
import { getGalleryImages } from "@/lib/firestore";
import { GalleryClient } from "./client";

export const revalidate = 0; // Revalidate this page on every request

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return <GalleryClient initialImages={images} />;
}
