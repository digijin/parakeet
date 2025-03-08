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
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  GlobeAltIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// Mock data
const mockThemes = [
  { id: 1, name: "Modern Business", preview: "/themes/modern-business.jpg", active: true },
  { id: 2, name: "Restaurant", preview: "/themes/restaurant.jpg", active: false },
  { id: 3, name: "Professional Services", preview: "/themes/professional.jpg", active: false },
];

const mockPages = [
  { id: 1, title: "Home", slug: "/", active: true, lastModified: "2024-03-20" },
  { id: 2, title: "About", slug: "/about", active: true, lastModified: "2024-03-19" },
  { id: 3, title: "Services", slug: "/services", active: true, lastModified: "2024-03-18" },
  { id: 4, title: "Contact", slug: "/contact", active: true, lastModified: "2024-03-17" },
];

export default function SiteBuilderPage() {
  const [activeTab, setActiveTab] = useState("domain");
  const [domain, setDomain] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newPage, setNewPage] = useState({ title: "", slug: "" });

  const handleDomainCheck = () => {
    // Implement domain check logic
    console.log("Checking domain:", domain);
  };

  const handleThemeActivate = (themeId: number) => {
    // Implement theme activation logic
    console.log("Activating theme:", themeId);
  };

  const handlePageToggle = (pageId: number) => {
    // Implement page toggle logic
    console.log("Toggling page:", pageId);
  };

  const handleAddPage = () => {
    // Implement add page logic
    console.log("Adding page:", newPage);
    onClose();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Site Builder</h1>
              <p className="text-gray-500">Configure your website settings</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key.toString())}>
            <Tab key="domain" title="Domain">
              <div className="p-4 space-y-4">
                <Card className="bg-content2">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-4">Domain Configuration</h3>
                    <div className="flex gap-4">
                      <Input
                        label="Domain Name"
                        placeholder="example.com"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="flex-1"
                      />
                      <Button color="primary" onPress={handleDomainCheck}>
                        Check Availability
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Enter your desired domain name to check its availability and register it.
                    </p>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="theme" title="Theme">
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockThemes.map((theme) => (
                    <Card key={theme.id} className={theme.active ? "border-primary" : ""}>
                      <CardBody>
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4" />
                        <h3 className="font-semibold">{theme.name}</h3>
                        <div className="flex justify-between items-center mt-4">
                          <Button
                            variant={theme.active ? "solid" : "light"}
                            color={theme.active ? "primary" : "default"}
                            onPress={() => handleThemeActivate(theme.id)}
                          >
                            {theme.active ? "Active" : "Activate"}
                          </Button>
                          <Button
                            variant="light"
                            isIconOnly
                            onPress={() => window.open(`/preview/${theme.id}`, "_blank")}
                          >
                            <GlobeAltIcon className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </Tab>

            <Tab key="pages" title="Pages">
              <div className="p-4">
                <div className="flex justify-end mb-4">
                  <Button
                    color="primary"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onPress={onOpen}
                  >
                    Add Page
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>PAGE</TableColumn>
                    <TableColumn>SLUG</TableColumn>
                    <TableColumn>LAST MODIFIED</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {mockPages.map((page) => (
                      <TableRow key={page.id}>
                        <TableCell>{page.title}</TableCell>
                        <TableCell>{page.slug}</TableCell>
                        <TableCell>{page.lastModified}</TableCell>
                        <TableCell>
                          <Switch
                            isSelected={page.active}
                            onValueChange={() => handlePageToggle(page.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              isIconOnly
                              variant="light"
                              onPress={() => window.location.href = `/dashboard/website/builder/pages/${page.id}`}
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              isIconOnly
                              variant="light"
                              color="danger"
                              onPress={() => console.log("Delete page:", page.id)}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Add New Page</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Page Title"
                placeholder="About Us"
                value={newPage.title}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
              />
              <Input
                label="Page Slug"
                placeholder="/about"
                value={newPage.slug}
                onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button color="primary" onPress={handleAddPage}>Add Page</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 