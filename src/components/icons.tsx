
import type { ComponentProps } from "react";
import Image from "next/image";

export function Logo(props: Omit<ComponentProps<typeof Image>, 'src' | 'alt' >) {
  const { width = 56, height = 56, ...rest } = props;
  return (
    <Image src="/logo.png" alt="Easyspark Logo" width={width} height={height} {...rest} />
  );
}
