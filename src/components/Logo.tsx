import Link from 'next/link';
import {cn} from '@/lib/utils';
import Image from 'next/image';

export function Logo({
  className,
  href = '/',
}: {
  className?: string;
  href?: string | null;
}) {
  const logoImage = (
     <Image
        src="/logo.png"
        alt="Easyspark Hub Logo"
        width={175}
        height={173}
        className={cn('h-12 w-auto', className)}
        priority
      />
  );

  const content = (
    <div className="flex items-center gap-3">
      {logoImage}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center group text-primary"
        prefetch={false}
      >
        {content}
      </Link>
    );
  }

  return content;
}
