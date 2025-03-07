import Link from "next/link";
import { Divider } from "@heroui/react";

export function Footer() {
  return (
    <footer className="bg-content2 border-t border-divider mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-foreground/80 hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/80 hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/investors" className="text-foreground/80 hover:text-foreground">
                  Investors
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-foreground/80 hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-foreground/80 hover:text-foreground">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/refer" className="text-foreground/80 hover:text-foreground">
                  Refer Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-foreground/80 hover:text-foreground">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Divider className="my-8" />
        <div className="text-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Parakeet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 