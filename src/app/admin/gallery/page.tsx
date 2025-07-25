import { GalleryClient } from "./client";
import { getGalleryImages } from "@/lib/firestore";
import type { GalleryImage } from "@/lib/types";

export default async function GalleryPage() {
  const images: GalleryImage[] = await getGalleryImages();
  return <GalleryClient initialImages={images} />;
}
