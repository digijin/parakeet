import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const isPrototype = process.env.NEXT_PUBLIC_IS_PROTO === "true";

  return (
    <div>
      {isPrototype && <div className="notification-warning">This is a prototype</div>}
      <div>homepage content</div>
      <Link href="/about">Learn more about us</Link>
    </div>
  );
}
