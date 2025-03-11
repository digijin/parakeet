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
  Chip,
  Input,
  Textarea,
} from "@heroui/react";
import {
  ShareIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ChartBarIcon,
  MegaphoneIcon,
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
  status: "sent" | "scheduled" | "failed";
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
    status: "sent",
  },
  {
    id: "msg2",
    platform: "LinkedIn",
    sender: "Jane Smith",
    content: "Great content! Would love to collaborate",
    timestamp: "2024-03-20T09:15:00",
    read: true,
    status: "sent",
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
  const [activeTab, setActiveTab] = useState("overview");
  const [platforms] = useState(mockPlatforms);
  const [messages] = useState(mockMessages);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [newPost, setNewPost] = useState({
    content: "",
    platforms: [] as string[],
  });

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle post submission
    setNewPost({ content: "", platforms: [] });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Social Channel</h1>
        <Button
          color="primary"
          startContent={<PlusIcon className="h-5 w-5" />}
          onPress={() => setActiveTab("create")}
        >
          Create Post
        </Button>
      </div>

      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
      >
        <Tab
          key="overview"
          title={
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5" />
              Overview
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <UserGroupIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Total Followers</p>
                    <p className="text-2xl font-bold">12.5K</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Engagement Rate</p>
                    <p className="text-2xl font-bold">4.2%</p>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <MegaphoneIcon className="h-6 w-6 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-default-500">Active Campaigns</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Tab>

        <Tab
          key="create"
          title={
            <div className="flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Create Post
            </div>
          }
        >
          <Card>
            <CardBody>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Platforms
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <Chip
                        key={platform.id}
                        className={`cursor-pointer ${
                          selectedPlatforms.includes(platform.id) ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => {
                          setSelectedPlatforms((prev) =>
                            prev.includes(platform.id)
                              ? prev.filter((id) => id !== platform.id)
                              : [...prev, platform.id]
                          );
                        }}
                      >
                        {platform.name}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Post Content
                  </label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost((prev) => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="What's on your mind?"
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="flat"
                    onPress={() => setActiveTab("overview")}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Post
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="messages"
          title={
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Messages
            </div>
          }
        >
          <Card>
            <CardBody>
              <Table aria-label="Messages table">
                <TableHeader>
                  <TableColumn>Platform</TableColumn>
                  <TableColumn>Message</TableColumn>
                  <TableColumn>Status</TableColumn>
                  <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>{message.platform}</TableCell>
                      <TableCell>{message.content}</TableCell>
                      <TableCell>
                        <Chip
                          color={
                            message.status === "sent"
                              ? "success"
                              : message.status === "scheduled"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {message.status}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="light"
                          startContent={<ShareIcon className="h-4 w-4" />}
                        >
                          Share
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
} 