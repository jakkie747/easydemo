import type { SVGProps } from "react";
import Image from "next/image";

export function Logo(props: Omit<SVGProps<SVGSVGElement>, 'children'>) {
  return (
    <Image src="/logo.png" alt="Easyspark Logo" width={32} height={32} {...props} />
  );
}
