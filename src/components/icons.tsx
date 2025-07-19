
import type { SVGProps } from "react";
import Image from "next/image";

export function Logo(props: Omit<SVGProps<SVGSVGElement>, 'children' | 'width' | 'height'> & {width?: number, height?: number}) {
  const { width = 56, height = 56, ...rest } = props;
  return (
    <Image src="/logo.png" alt="Easyspark Logo" width={width} height={height} {...rest} />
  );
}
