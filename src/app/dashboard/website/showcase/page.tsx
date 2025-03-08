"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
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
  Chip,
} from "@heroui/react";
import {
  PhotoIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  available: boolean;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  image?: string;
  available: boolean;
}

const mockMenuItems: MenuItem[] = [
  {
    id: 1,
    name: "Classic Burger",
    description: "Beef patty with lettuce, tomato, and cheese",
    price: 12.99,
    category: "Mains",
    available: true,
  },
  {
    id: 2,
    name: "Caesar Salad",
    description: "Romaine lettuce with parmesan and croutons",
    price: 9.99,
    category: "Starters",
    available: true,
  },
];

const mockProducts: Product[] = [
  {
    id: 1,
    name: "T-Shirt",
    description: "100% cotton t-shirt",
    price: 24.99,
    stock: 100,
    category: "Apparel",
    available: true,
  },
  {
    id: 2,
    name: "Coffee Mug",
    description: "Ceramic coffee mug",
    price: 14.99,
    stock: 50,
    category: "Accessories",
    available: true,
  },
];

const mockServices: Service[] = [
  {
    id: 1,
    name: "Haircut",
    description: "Professional haircut service",
    price: 45.00,
    duration: "45 min",
    category: "Hair",
    available: true,
  },
  {
    id: 2,
    name: "Massage",
    description: "Full body massage",
    price: 80.00,
    duration: "60 min",
    category: "Spa",
    available: true,
  },
];

export default function ShowcasePage() {
  const [activeTab, setActiveTab] = useState("menu");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [editItem, setEditItem] = useState<MenuItem | Product | Service | null>(null);

  const handleAdd = () => {
    setEditItem(null);
    onOpen();
  };

  const handleEdit = (item: MenuItem | Product | Service) => {
    setEditItem(item);
    onOpen();
  };

  const handleDelete = (id: number) => {
    switch (activeTab) {
      case "menu":
        setMenuItems(items => items.filter(item => item.id !== id));
        break;
      case "products":
        setProducts(items => items.filter(item => item.id !== id));
        break;
      case "services":
        setServices(items => items.filter(item => item.id !== id));
        break;
    }
  };

  const handleToggle = (id: number) => {
    switch (activeTab) {
      case "menu":
        setMenuItems(items =>
          items.map(item =>
            item.id === id ? { ...item, available: !item.available } : item
          )
        );
        break;
      case "products":
        setProducts(items =>
          items.map(item =>
            item.id === id ? { ...item, available: !item.available } : item
          )
        );
        break;
      case "services":
        setServices(items =>
          items.map(item =>
            item.id === id ? { ...item, available: !item.available } : item
          )
        );
        break;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PhotoIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Showcase</h1>
              <p className="text-gray-500">Manage your menu, products, and services</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key.toString())}>
            <Tab key="menu" title="Menu Items">
              <div className="p-4">
                <div className="flex justify-end mb-4">
                  <Button
                    color="primary"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onPress={handleAdd}
                  >
                    Add Menu Item
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip size="sm">{item.category}</Chip>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Switch
                            isSelected={item.available}
                            onValueChange={() => handleToggle(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              isIconOnly
                              variant="light"
                              onPress={() => handleEdit(item)}
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              isIconOnly
                              variant="light"
                              color="danger"
                              onPress={() => handleDelete(item.id)}
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

            <Tab key="products" title="Products">
              <div className="p-4">
                <div className="flex justify-end mb-4">
                  <Button
                    color="primary"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onPress={handleAdd}
                  >
                    Add Product
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>STOCK</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip size="sm">{product.category}</Chip>
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>
                          <Switch
                            isSelected={product.available}
                            onValueChange={() => handleToggle(product.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              isIconOnly
                              variant="light"
                              onPress={() => handleEdit(product)}
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              isIconOnly
                              variant="light"
                              color="danger"
                              onPress={() => handleDelete(product.id)}
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

            <Tab key="services" title="Services">
              <div className="p-4">
                <div className="flex justify-end mb-4">
                  <Button
                    color="primary"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onPress={handleAdd}
                  >
                    Add Service
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>CATEGORY</TableColumn>
                    <TableColumn>PRICE</TableColumn>
                    <TableColumn>DURATION</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{service.name}</p>
                            <p className="text-sm text-gray-500">{service.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Chip size="sm">{service.category}</Chip>
                        </TableCell>
                        <TableCell>${service.price.toFixed(2)}</TableCell>
                        <TableCell>{service.duration}</TableCell>
                        <TableCell>
                          <Switch
                            isSelected={service.available}
                            onValueChange={() => handleToggle(service.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              isIconOnly
                              variant="light"
                              onPress={() => handleEdit(service)}
                            >
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                            <Button
                              isIconOnly
                              variant="light"
                              color="danger"
                              onPress={() => handleDelete(service.id)}
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

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {editItem ? `Edit ${activeTab === "menu" ? "Menu Item" : activeTab === "products" ? "Product" : "Service"}` : 
                       `Add ${activeTab === "menu" ? "Menu Item" : activeTab === "products" ? "Product" : "Service"}`}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Name"
                placeholder="Enter name"
                value={editItem?.name || ""}
              />
              <Textarea
                label="Description"
                placeholder="Enter description"
                value={editItem?.description || ""}
              />
              <div className="flex gap-4">
                <Input
                  type="number"
                  label="Price"
                  placeholder="0.00"
                  startContent={<CurrencyDollarIcon className="w-4 h-4" />}
                  value={editItem?.price?.toString() || ""}
                />
                <Input
                  label="Category"
                  placeholder="Enter category"
                  startContent={<TagIcon className="w-4 h-4" />}
                  value={editItem?.category || ""}
                />
              </div>
              {activeTab === "products" && (
                <Input
                  type="number"
                  label="Stock"
                  placeholder="0"
                  value={(editItem as Product)?.stock?.toString() || ""}
                />
              )}
              {activeTab === "services" && (
                <Input
                  label="Duration"
                  placeholder="e.g., 30 min"
                  value={(editItem as Service)?.duration || ""}
                />
              )}
              <div className="flex items-center gap-2">
                <Switch
                  isSelected={editItem?.available ?? true}
                />
                <span>Available</span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button color="primary">Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 