import Link from "next/link";
import { Divider } from "@heroui/react";
import { 
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

export function Footer() {
  return (
    <footer className="bg-content2 border-t border-divider mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
            <h3 className="font-semibold mb-4">Social</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/social/twitter" className="text-foreground/80 hover:text-foreground">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="/social/bluesky" className="text-foreground/80 hover:text-foreground">
                  Bluesky
                </Link>
              </li>
              <li>
                <Link href="/social/facebook" className="text-foreground/80 hover:text-foreground">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="/social/email" className="text-foreground/80 hover:text-foreground">
                  Email
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Channels</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/content" className="text-foreground/80 hover:text-foreground flex items-center gap-2">
                  <DocumentTextIcon className="w-4 h-4" />
                  Content Centre
                </Link>
              </li>
              <li>
                <Link href="/dashboard/seo" className="text-foreground/80 hover:text-foreground flex items-center gap-2">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  SEO Centre
                </Link>
              </li>
              <li>
                <Link href="/dashboard/broadcast" className="text-foreground/80 hover:text-foreground flex items-center gap-2">
                  <MegaphoneIcon className="w-4 h-4" />
                  Broadcast Centre
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard/help" className="text-foreground/80 hover:text-foreground flex items-center gap-2">
                  <QuestionMarkCircleIcon className="w-4 h-4" />
                  Help Centre
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/80 hover:text-foreground flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-foreground/80 hover:text-foreground flex items-center gap-2">
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
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