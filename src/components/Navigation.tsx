import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, DecodedToken, getStoredToken, removeStoredToken, verifyTokenWithAPI, createUserFromToken } from "@/lib/auth";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log("[Navigation] Starting auth check");
      const token = getStoredToken();
      console.log("[Navigation] Token from sessionStorage:", token ? "present" : "missing");

      if (token) {
        try {
          console.log("[Navigation] Sending token to verify endpoint");
          const result = await verifyTokenWithAPI(token);
          console.log("[Navigation] Verify response:", result);

          if (result.success && result.data?.decoded) {
            console.log("[Navigation] Token verified, updating user state");
            setIsLoggedIn(true);
            setUser(createUserFromToken(result.data.decoded));
            console.log("[Navigation] User state updated:", user);
          } else {
            console.log("[Navigation] Token verification failed, logging out");
            handleLogout();
          }
        } catch (error) {
          console.error("[Navigation] Token verification error:", error);
          handleLogout();
        }
      } else {
        console.log("[Navigation] No token found, setting logged out state");
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuthStatus();
    // Add event listener for storage changes
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    removeStoredToken();
    setIsLoggedIn(false);
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      className="bg-content2 border-b border-divider shadow-md"
    >
      <NavbarContent>
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/brand/logo.svg"
              alt="Parakeet Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <p className="font-bold text-inherit">Parakeet</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} className="hover:opacity-80">
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {isLoggedIn && user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform cursor-pointer"
                  name={user.displayName}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger" onPress={handleLogout}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button 
              as={Link}
              href="/auth/login" 
              variant="solid"
              color="primary"
              className="font-medium shadow-lg"
            >
              Login
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link 
              href={item.href}
              className="w-full hover:opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        {!isLoggedIn && (
          <NavbarMenuItem>
            <Link 
              href="/auth/login"
              className="w-full hover:opacity-80"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  );
} 