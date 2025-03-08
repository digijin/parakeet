"use client";

import { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Divider,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import { 
  GlobeAltIcon,
  PhotoIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  isActive: boolean;
}

interface Page {
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  isHomepage: boolean;
}

const mockThemes: Theme[] = [
  {
    id: "modern-business",
    name: "Modern Business",
    description: "Clean and professional design for businesses",
    preview: "/themes/modern-business.jpg",
    isActive: true
  },
  {
    id: "restaurant",
    name: "Restaurant",
    description: "Perfect for restaurants and food businesses",
    preview: "/themes/restaurant.jpg",
    isActive: false
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work with style",
    preview: "/themes/portfolio.jpg",
    isActive: false
  }
];

const mockPages: Page[] = [
  {
    id: "home",
    title: "Home",
    slug: "/",
    isPublished: true,
    isHomepage: true
  },
  {
    id: "about",
    title: "About Us",
    slug: "/about",
    isPublished: true,
    isHomepage: false
  },
  {
    id: "services",
    title: "Services",
    slug: "/services",
    isPublished: true,
    isHomepage: false
  },
  {
    id: "contact",
    title: "Contact",
    slug: "/contact",
    isPublished: true,
    isHomepage: false
  }
];

export default function SiteBuilderPage() {
  const [currentDomain, setCurrentDomain] = useState("example.com");
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");
  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [newPage, setNewPage] = useState({ title: "", slug: "" });
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [themes, setThemes] = useState<Theme[]>(mockThemes);

  const handleAddPage = () => {
    setNewPage({ title: "", slug: "" });
    setIsPageModalOpen(true);
  };

  const handleSavePage = () => {
    if (newPage.title && newPage.slug) {
      setPages([
        ...pages,
        {
          id: newPage.slug.replace(/\//g, "-"),
          title: newPage.title,
          slug: newPage.slug,
          isPublished: true,
          isHomepage: false
        }
      ]);
      setIsPageModalOpen(false);
    }
  };

  const handleDeletePage = (pageId: string) => {
    setPages(pages.filter(page => page.id !== pageId));
  };

  const handleSetHomepage = (pageId: string) => {
    setPages(pages.map(page => ({
      ...page,
      isHomepage: page.id === pageId
    })));
  };

  const handleToggleTheme = (themeId: string) => {
    setThemes(themes.map(theme => ({
      ...theme,
      isActive: theme.id === themeId
    })));
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Site Builder</h1>

      {/* Domain Settings */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Domain Settings</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            onPress={() => setIsDomainModalOpen(true)}
          >
            Change Domain
          </Button>
        </CardHeader>
        <CardBody>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-foreground/60">Current Domain</p>
              <p className="text-lg font-medium">{currentDomain}</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-success" />
              <span className="text-sm text-success">Connected</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Theme Selection */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center gap-2">
          <PhotoIcon className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Theme Selection</h2>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {themes.map(theme => (
              <Card key={theme.id} className="relative">
                <div className="aspect-video bg-content2 rounded-t-lg" />
                <CardBody>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{theme.name}</h3>
                      <p className="text-sm text-foreground/60">{theme.description}</p>
                    </div>
                    <Switch
                      isSelected={theme.isActive}
                      onValueChange={() => handleToggleTheme(theme.id)}
                    />
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Page Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Page Management</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            startContent={<PlusIcon className="w-5 h-5" />}
            onPress={handleAddPage}
          >
            Add Page
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {pages.map(page => (
              <div
                key={page.id}
                className="flex items-center justify-between p-4 bg-content2 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{page.title}</p>
                      {page.isHomepage && (
                        <Chip size="sm" color="primary" variant="flat">
                          Homepage
                        </Chip>
                      )}
                    </div>
                    <p className="text-sm text-foreground/60">{page.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!page.isHomepage && (
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => handleSetHomepage(page.id)}
                    >
                      <HomeIcon className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => {/* Handle edit */}}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  {!page.isHomepage && (
                    <Button
                      isIconOnly
                      variant="light"
                      color="danger"
                      onPress={() => handleDeletePage(page.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Domain Modal */}
      <Modal isOpen={isDomainModalOpen} onClose={() => setIsDomainModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Change Domain</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="New Domain"
                placeholder="Enter your domain"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              />
              <p className="text-sm text-foreground/60">
                Enter your domain name without http:// or https://
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsDomainModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => {
              setCurrentDomain(newDomain);
              setIsDomainModalOpen(false);
            }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Page Modal */}
      <Modal isOpen={isPageModalOpen} onClose={() => setIsPageModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Add New Page</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Page Title"
                placeholder="Enter page title"
                value={newPage.title}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
              />
              <Input
                label="Page URL"
                placeholder="/page-url"
                value={newPage.slug}
                onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsPageModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSavePage}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 