import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <div>homepage content</div>
      <Link href="/about">Learn more about us</Link>
    </div>
  );
}
