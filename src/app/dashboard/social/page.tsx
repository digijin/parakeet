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
} from "@heroui/react";
import {
  ShareIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ChartBarIcon,
  MegaphoneIcon,
  ArrowPathIcon,
  LinkIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface SocialPlatform {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  pages: SocialPage[];
}

interface SocialPage {
  id: string;
  name: string;
  type: "page" | "group";
  followers: number;
  connected: boolean;
}

interface Message {
  id: string;
  platform: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface Post {
  id: string;
  platform: string;
  content: string;
  scheduledFor?: string;
  status: "draft" | "scheduled" | "published";
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

const mockPlatforms: SocialPlatform[] = [
  {
    id: "facebook",
    name: "Facebook",
    icon: "facebook.svg",
    connected: true,
    pages: [
      { id: "fb1", name: "Business Page", type: "page", followers: 5000, connected: true },
      { id: "fb2", name: "Community Group", type: "group", followers: 2500, connected: false },
    ],
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "twitter.svg",
    connected: false,
    pages: [],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin.svg",
    connected: true,
    pages: [
      { id: "li1", name: "Company Page", type: "page", followers: 3000, connected: true },
    ],
  },
];

const mockMessages: Message[] = [
  {
    id: "msg1",
    platform: "Facebook",
    sender: "John Doe",
    content: "Hi, I'm interested in your services",
    timestamp: "2024-03-20T10:30:00",
    read: false,
  },
  {
    id: "msg2",
    platform: "LinkedIn",
    sender: "Jane Smith",
    content: "Great content! Would love to collaborate",
    timestamp: "2024-03-20T09:15:00",
    read: true,
  },
];

const mockPosts: Post[] = [
  {
    id: "post1",
    platform: "Facebook",
    content: "Check out our latest blog post on digital marketing trends!",
    scheduledFor: "2024-03-25T12:00:00",
    status: "scheduled",
    engagement: { likes: 45, comments: 12, shares: 8 },
  },
  {
    id: "post2",
    platform: "LinkedIn",
    content: "We're hiring! Join our growing team.",
    status: "published",
    engagement: { likes: 89, comments: 23, shares: 15 },
  },
];

export default function SocialChannelPage() {
  const [activeTab, setActiveTab] = useState("platforms");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [platforms, setPlatforms] = useState(mockPlatforms);
  const [messages, setMessages] = useState(mockMessages);
  const [posts, setPosts] = useState(mockPosts);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleConnect = (platformId: string) => {
    // Implement OAuth flow
    console.log("Connecting to platform:", platformId);
  };

  const handlePageConnect = (platformId: string, pageId: string) => {
    // Implement page/group connection
    console.log("Connecting to page:", pageId);
  };

  const handleCreatePixel = () => {
    // Implement pixel creation
    console.log("Creating pixel");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShareIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Social Channel</h1>
              <p className="text-gray-500">Manage your social media presence</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key.toString())}>
            <Tab key="platforms" title="Platforms">
              <div className="p-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {platforms.map((platform) => (
                    <Card key={platform.id} className="bg-content2">
                      <CardBody>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full" />
                            <h3 className="text-lg font-semibold">{platform.name}</h3>
                          </div>
                          <Button
                            color={platform.connected ? "success" : "primary"}
                            onPress={() => handleConnect(platform.id)}
                          >
                            {platform.connected ? "Connected" : "Connect"}
                          </Button>
                        </div>
                        {platform.connected && (
                          <div className="space-y-4">
                            <div className="text-sm font-medium">Pages & Groups</div>
                            {platform.pages.map((page) => (
                              <div key={page.id} className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium">{page.name}</div>
                                  <div className="text-sm text-gray-500">
                                    {page.followers.toLocaleString()} followers
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  color={page.connected ? "success" : "primary"}
                                  onPress={() => handlePageConnect(platform.id, page.id)}
                                >
                                  {page.connected ? "Connected" : "Connect"}
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="light"
                              startContent={<PlusIcon className="w-4 h-4" />}
                              className="w-full"
                            >
                              Add New Page/Group
                            </Button>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </Tab>

            <Tab key="messages" title="Messages">
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableColumn>PLATFORM</TableColumn>
                    <TableColumn>SENDER</TableColumn>
                    <TableColumn>MESSAGE</TableColumn>
                    <TableColumn>TIME</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell>
                          <Chip>{message.platform}</Chip>
                        </TableCell>
                        <TableCell>{message.sender}</TableCell>
                        <TableCell>{message.content}</TableCell>
                        <TableCell>{new Date(message.timestamp).toLocaleString()}</TableCell>
                        <TableCell>
                          <Button size="sm">Reply</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>

            <Tab key="content" title="Create Content">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Platforms</label>
                        <div className="flex gap-2">
                          {platforms.map((platform) => (
                            <Chip
                              key={platform.id}
                              className="cursor-pointer"
                              onClick={() => {}}
                            >
                              {platform.name}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <Textarea
                        label="Content"
                        placeholder="Write your post..."
                        rows={4}
                      />
                      <div className="flex gap-4">
                        <Input
                          type="datetime-local"
                          label="Schedule For"
                          className="flex-1"
                        />
                        <Button color="primary">Schedule Post</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                <Card className="bg-content2">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-4">Grow Audience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        variant="flat"
                        startContent={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
                      >
                        Comment on Posts
                      </Button>
                      <Button
                        variant="flat"
                        startContent={<UserGroupIcon className="w-5 h-5" />}
                      >
                        Join Groups
                      </Button>
                      <Button
                        variant="flat"
                        startContent={<LinkIcon className="w-5 h-5" />}
                      >
                        Create Backlinks
                      </Button>
                      <Button
                        variant="flat"
                        startContent={<MegaphoneIcon className="w-5 h-5" />}
                      >
                        Create Ad
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="pixel" title="Pixel">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-semibold">Facebook Pixel</h3>
                        <p className="text-sm text-gray-500">Track website visitors and create custom audiences</p>
                      </div>
                      <Button
                        color="primary"
                        startContent={<PlusIcon className="w-5 h-5" />}
                        onPress={handleCreatePixel}
                      >
                        Create Pixel
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">Blog Pixel</div>
                          <div className="text-sm text-gray-500">ID: 123456789</div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="flat"
                            startContent={<ChartBarIcon className="w-5 h-5" />}
                          >
                            View Audience
                          </Button>
                          <Button
                            variant="flat"
                            startContent={<MegaphoneIcon className="w-5 h-5" />}
                          >
                            Create Ad
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
} 