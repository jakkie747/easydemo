'use client';

import { cn } from '@/lib/utils';

export const SplashScreen = ({ isFading }: { isFading: boolean }) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-500 ease-in',
        { 'opacity-0': isFading }
      )}
    >
      <video
        src="/Logo_splash.mp4"
        autoPlay
        muted
        playsInline
        className="h-full w-full object-contain"
      />
    </div>
  );
};
