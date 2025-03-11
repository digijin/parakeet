"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Input,
  Textarea,
  Select,
  SelectItem,
  Progress,
  Divider,
} from "@heroui/react";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  PencilIcon,
  LinkIcon,
  CalendarIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  QrCodeIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  PhotoIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

interface LocalListing {
  id: string;
  platform: "google" | "apple" | "bing";
  name: string;
  address: string;
  connected: boolean;
  status: "verified" | "pending" | "incomplete";
  metrics: {
    views: number;
    searches: number;
    actions: number;
  };
}

interface SEOTask {
  id: string;
  type: "local" | "content" | "review";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueDate: string;
}

interface ContentPiece {
  id: string;
  type: "blog" | "social" | "ad" | "broadcast";
  title: string;
  keywords: string[];
  status: "draft" | "published" | "scheduled";
  publishDate?: string;
  seoScore: number;
  metrics: {
    views: number;
    engagement: number;
    backlinks: number;
  };
}

interface Review {
  id: string;
  platform: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  replied: boolean;
  reply?: string;
}

const mockListings: LocalListing[] = [
  {
    id: "gbp1",
    platform: "google",
    name: "Business Name",
    address: "123 Main St, City, State",
    connected: true,
    status: "verified",
    metrics: {
      views: 1200,
      searches: 450,
      actions: 85,
    },
  },
  {
    id: "apple1",
    platform: "apple",
    name: "Business Name",
    address: "123 Main St, City, State",
    connected: false,
    status: "incomplete",
    metrics: {
      views: 0,
      searches: 0,
      actions: 0,
    },
  },
];

const mockTasks: SEOTask[] = [
  {
    id: "task1",
    type: "local",
    title: "Complete Google Business Profile",
    description: "Add missing business hours and photos",
    priority: "high",
    status: "pending",
    dueDate: "2024-04-01",
  },
  {
    id: "task2",
    type: "content",
    title: "Optimize Blog Posts",
    description: "Add meta descriptions and optimize headings",
    priority: "medium",
    status: "in_progress",
    dueDate: "2024-04-05",
  },
];

const mockContent: ContentPiece[] = [
  {
    id: "content1",
    type: "blog",
    title: "SEO Best Practices 2024",
    keywords: ["seo", "digital marketing", "best practices"],
    status: "published",
    publishDate: "2024-03-15",
    seoScore: 85,
    metrics: {
      views: 1200,
      engagement: 450,
      backlinks: 12,
    },
  },
  {
    id: "content2",
    type: "social",
    title: "Local SEO Tips",
    keywords: ["local seo", "business", "marketing"],
    status: "scheduled",
    publishDate: "2024-04-01",
    seoScore: 92,
    metrics: {
      views: 0,
      engagement: 0,
      backlinks: 0,
    },
  },
];

const mockReviews: Review[] = [
  {
    id: "review1",
    platform: "Google",
    author: "John Doe",
    rating: 5,
    content: "Great service! Very professional and helpful team.",
    date: "2024-03-15",
    replied: true,
    reply: "Thank you for your kind words! We're glad we could help.",
  },
  {
    id: "review2",
    platform: "Bing",
    author: "Jane Smith",
    rating: 4,
    content: "Good experience overall. Could improve response time.",
    date: "2024-03-10",
    replied: false,
  },
];

export default function SEOCentrePage() {
  const [activeTab, setActiveTab] = useState("listings");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listings] = useState(mockListings);
  const [tasks] = useState(mockTasks);
  const [content] = useState(mockContent);
  const [reviews] = useState(mockReviews);
  const [modalMode, setModalMode] = useState<"connect" | "edit" | "reply">("connect");
  const [selectedListing, setSelectedListing] = useState<LocalListing | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleConnectListing = (platform: "google" | "apple" | "bing") => {
    setModalMode("connect");
    setSelectedListing(null);
    onOpen();
  };

  const handleEditListing = (listing: LocalListing) => {
    setModalMode("edit");
    setSelectedListing(listing);
    onOpen();
  };

  const handleReplyToReview = (review: Review) => {
    setModalMode("reply");
    setSelectedReview(review);
    onOpen();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MagnifyingGlassIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">SEO Centre</h1>
              <p className="text-gray-500">Optimize your online presence</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key.toString())}>
            <Tab key="listings" title="Local SEO">
              <div className="p-4 space-y-6">
                {/* Business Listings */}
                <Card className="bg-content2">
                  <CardBody>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Business Listings</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="flat"
                            startContent={<ChartBarIcon className="w-4 h-4" />}
                          >
                            Audit SEO
                          </Button>
                          <Button
                            variant="flat"
                            startContent={<ClipboardDocumentListIcon className="w-4 h-4" />}
                          >
                            Generate Citations
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Google Business Profile */}
                        <Card>
                          <CardBody>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <BuildingOfficeIcon className="w-6 h-6" />
                                  <h4 className="font-medium">Google Business</h4>
                                </div>
                                <Button
                                  size="sm"
                                  color={listings[0].connected ? "success" : "primary"}
                                  onPress={() => handleConnectListing("google")}
                                >
                                  {listings[0].connected ? "Connected" : "Connect"}
                                </Button>
                              </div>
                              {listings[0].connected && (
                                <>
                                  <div className="text-sm space-y-1">
                                    <p className="font-medium">{listings[0].name}</p>
                                    <p className="text-gray-500">{listings[0].address}</p>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2 text-center">
                                    <div>
                                      <p className="text-sm font-medium">{listings[0].metrics.views}</p>
                                      <p className="text-xs text-gray-500">Views</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">{listings[0].metrics.searches}</p>
                                      <p className="text-xs text-gray-500">Searches</p>
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">{listings[0].metrics.actions}</p>
                                      <p className="text-xs text-gray-500">Actions</p>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="flat"
                                    startContent={<PencilIcon className="w-4 h-4" />}
                                    onPress={() => handleEditListing(listings[0])}
                                  >
                                    Edit
                                  </Button>
                                </>
                              )}
                            </div>
                          </CardBody>
                        </Card>

                        {/* Apple Maps */}
                        <Card>
                          <CardBody>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="w-6 h-6" />
                                  <h4 className="font-medium">Apple Maps</h4>
                                </div>
                                <Button
                                  size="sm"
                                  color="primary"
                                  onPress={() => handleConnectListing("apple")}
                                >
                                  Connect
                                </Button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>

                        {/* Bing Places */}
                        <Card>
                          <CardBody>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <BuildingOfficeIcon className="w-6 h-6" />
                                  <h4 className="font-medium">Bing Places</h4>
                                </div>
                                <Button
                                  size="sm"
                                  color="primary"
                                  onPress={() => handleConnectListing("bing")}
                                >
                                  Connect
                                </Button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Tasks</h4>
                        <Table>
                          <TableHeader>
                            <TableColumn>TASK</TableColumn>
                            <TableColumn>PRIORITY</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                            <TableColumn>DUE DATE</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {tasks
                              .filter((task) => task.type === "local")
                              .map((task) => (
                                <TableRow key={task.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{task.title}</p>
                                      <p className="text-sm text-gray-500">{task.description}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      color={
                                        task.priority === "high"
                                          ? "danger"
                                          : task.priority === "medium"
                                          ? "warning"
                                          : "success"
                                      }
                                    >
                                      {task.priority}
                                    </Chip>
                                  </TableCell>
                                  <TableCell>
                                    <Chip
                                      color={
                                        task.status === "completed"
                                          ? "success"
                                          : task.status === "in_progress"
                                          ? "warning"
                                          : "default"
                                      }
                                    >
                                      {task.status}
                                    </Chip>
                                  </TableCell>
                                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="content" title="Content Marketing">
              <div className="p-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-content2">
                    <CardBody>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">SEO Audit</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span>Overall Score</span>
                            <span className="font-medium">85/100</span>
                          </div>
                          <Progress value={85} className="h-2" color="success" />
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Quick Actions</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              variant="flat"
                              startContent={<DocumentTextIcon className="w-4 h-4" />}
                            >
                              View Report
                            </Button>
                            <Button
                              variant="flat"
                              startContent={<ArrowPathIcon className="w-4 h-4" />}
                            >
                              Run New Audit
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="bg-content2">
                    <CardBody>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Content Calendar</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Upcoming Content</h4>
                            <Button
                              size="sm"
                              variant="flat"
                              startContent={<CalendarIcon className="w-4 h-4" />}
                            >
                              View Calendar
                            </Button>
                          </div>
                          {content
                            .filter((piece) => piece.status === "scheduled")
                            .map((piece) => (
                              <div
                                key={piece.id}
                                className="flex items-center justify-between p-2 bg-content3 rounded"
                              >
                                <div>
                                  <p className="font-medium">{piece.title}</p>
                                  <p className="text-sm text-gray-500">
                                    {new Date(piece.publishDate!).toLocaleDateString()}
                                  </p>
                                </div>
                                <Chip>{piece.type}</Chip>
                              </div>
                            ))}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                <Card className="bg-content2">
                  <CardBody>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Content Tools</h3>
                        <Button
                          color="primary"
                          startContent={<PlusIcon className="w-4 h-4" />}
                        >
                          Create Content
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardBody>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <MagnifyingGlassIcon className="w-6 h-6" />
                                <h4 className="font-medium">Keyword Research</h4>
                              </div>
                              <p className="text-sm text-gray-500">
                                Find high-value keywords and analyze competition
                              </p>
                              <Button
                                size="sm"
                                variant="flat"
                                className="w-full"
                              >
                                Research Keywords
                              </Button>
                            </div>
                          </CardBody>
                        </Card>

                        <Card>
                          <CardBody>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <PhotoIcon className="w-6 h-6" />
                                <h4 className="font-medium">Image Editor</h4>
                              </div>
                              <p className="text-sm text-gray-500">
                                Edit images with Canva integration
                              </p>
                              <Button
                                size="sm"
                                variant="flat"
                                className="w-full"
                              >
                                Open Editor
                              </Button>
                            </div>
                          </CardBody>
                        </Card>

                        <Card>
                          <CardBody>
                            <div className="space-y-4">
                              <div className="flex items-center gap-2">
                                <LinkIcon className="w-6 h-6" />
                                <h4 className="font-medium">Backlink Generator</h4>
                              </div>
                              <p className="text-sm text-gray-500">
                                Find and create quality backlink opportunities
                              </p>
                              <Button
                                size="sm"
                                variant="flat"
                                className="w-full"
                              >
                                Generate Backlinks
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="reviews" title="Reviews">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Review Management</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="flat"
                            startContent={<QrCodeIcon className="w-4 h-4" />}
                          >
                            Generate Review Link
                          </Button>
                          <Button
                            color="primary"
                            startContent={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                          >
                            Request Reviews
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                        <Card>
                          <CardBody>
                            <div className="space-y-2">
                              <p className="text-2xl font-bold">4.8</p>
                              <div className="flex justify-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <StarIcon
                                    key={star}
                                    className="w-4 h-4 text-yellow-400"
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-500">Overall Rating</p>
                            </div>
                          </CardBody>
                        </Card>
                        <Card>
                          <CardBody>
                            <div className="space-y-2">
                              <p className="text-2xl font-bold">124</p>
                              <p className="text-sm text-gray-500">Total Reviews</p>
                            </div>
                          </CardBody>
                        </Card>
                        <Card>
                          <CardBody>
                            <div className="space-y-2">
                              <p className="text-2xl font-bold">95%</p>
                              <p className="text-sm text-gray-500">Positive Reviews</p>
                            </div>
                          </CardBody>
                        </Card>
                        <Card>
                          <CardBody>
                            <div className="space-y-2">
                              <p className="text-2xl font-bold">89%</p>
                              <p className="text-sm text-gray-500">Response Rate</p>
                            </div>
                          </CardBody>
                        </Card>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Recent Reviews</h4>
                          <Select
                            placeholder="Filter by platform"
                            className="w-48"
                          >
                            <SelectItem key="all">All Platforms</SelectItem>
                            <SelectItem key="google">Google</SelectItem>
                            <SelectItem key="bing">Bing</SelectItem>
                          </Select>
                        </div>

                        <Table>
                          <TableHeader>
                            <TableColumn>REVIEW</TableColumn>
                            <TableColumn>RATING</TableColumn>
                            <TableColumn>PLATFORM</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>ACTIONS</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {reviews.map((review) => (
                              <TableRow key={review.id}>
                                <TableCell>
                                  <div>
                                    <p className="font-medium">{review.author}</p>
                                    <p className="text-sm text-gray-500">{review.content}</p>
                                    {review.replied && (
                                      <div className="mt-2 pl-4 border-l-2">
                                        <p className="text-sm italic">{review.reply}</p>
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <StarIcon
                                        key={i}
                                        className="w-4 h-4 text-yellow-400"
                                      />
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Chip>{review.platform}</Chip>
                                </TableCell>
                                <TableCell>
                                  {new Date(review.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    variant="flat"
                                    isDisabled={review.replied}
                                    onPress={() => handleReplyToReview(review)}
                                  >
                                    {review.replied ? "Replied" : "Reply"}
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          <ModalHeader>
            {modalMode === "connect"
              ? "Connect Business Listing"
              : modalMode === "edit"
              ? "Edit Business Listing"
              : "Reply to Review"
            }
          </ModalHeader>
          <ModalBody>
            {modalMode === "connect" && (
              <div className="space-y-4">
                <Input
                  label="Business Name"
                  placeholder="Enter your business name"
                />
                <Input
                  label="Address"
                  placeholder="Enter your business address"
                />
                <Input
                  label="Phone"
                  placeholder="Enter your business phone"
                />
                <Input
                  label="Website"
                  placeholder="Enter your website URL"
                />
              </div>
            )}
            {modalMode === "edit" && selectedListing && (
              <div className="space-y-4">
                <Input
                  label="Business Name"
                  value={selectedListing.name}
                />
                <Input
                  label="Address"
                  value={selectedListing.address}
                />
                <div className="flex gap-4">
                  <Input
                    label="Phone"
                    placeholder="Enter phone"
                  />
                  <Input
                    label="Website"
                    placeholder="Enter website"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Business Hours</label>
                  <Table>
                    <TableHeader>
                      <TableColumn>DAY</TableColumn>
                      <TableColumn>OPEN</TableColumn>
                      <TableColumn>CLOSE</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <TableRow key={day}>
                          <TableCell>{day}</TableCell>
                          <TableCell>
                            <Input
                              type="time"
                              size="sm"
                              className="w-24"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="time"
                              size="sm"
                              className="w-24"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            {modalMode === "reply" && selectedReview && (
              <div className="space-y-4">
                <div className="p-4 bg-content2 rounded-lg">
                  <p className="font-medium">{selectedReview.author}</p>
                  <div className="flex my-1">
                    {[...Array(selectedReview.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm">{selectedReview.content}</p>
                </div>
                <Textarea
                  label="Your Reply"
                  placeholder="Write your response..."
                  rows={4}
                />
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button color="primary">
              {modalMode === "connect"
                ? "Connect"
                : modalMode === "edit"
                ? "Save Changes"
                : "Send Reply"
              }
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 