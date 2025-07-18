
"use client";

import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { useToast } from './use-toast';

export function useUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);
  const { toast } = useToast();

  const upload = (file: File, path: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      setProgress(0);
      setDownloadURL(null);

      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          toast({
            variant: "destructive",
            title: "Upload Error",
            description: "There was an error uploading your file.",
          });
          setIsLoading(false);
          reject(error);
          resolve(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url);
            setIsLoading(false);
            resolve(url);
          });
        }
      );
    });
  };

  return { upload, progress, downloadURL, isLoading };
}
