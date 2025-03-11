"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Tabs,
  Tab,
  Input,
  Select,
  SelectItem,
  Badge,
  Progress,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@heroui/react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

// Types for our content items
interface ContentItem {
  id: string;
  title: string;
  type: "post" | "video" | "image" | "story";
  status: "draft" | "scheduled" | "published";
  scheduledFor?: string;
  engagement: number;
  views: number;
  platform: "facebook" | "twitter" | "instagram" | "linkedin";
  lastModified: string;
}

// Mock data
const mockContent: ContentItem[] = [
  {
    id: "1",
    title: "Summer Sale Announcement",
    type: "post",
    status: "published",
    engagement: 85,
    views: 1200,
    platform: "facebook",
    lastModified: "2024-03-15T10:00:00",
  },
  {
    id: "2",
    title: "Product Launch Video",
    type: "video",
    status: "scheduled",
    scheduledFor: "2024-03-20T15:00:00",
    engagement: 0,
    views: 0,
    platform: "instagram",
    lastModified: "2024-03-14T16:30:00",
  },
  {
    id: "3",
    title: "Team Spotlight",
    type: "story",
    status: "draft",
    engagement: 0,
    views: 0,
    platform: "linkedin",
    lastModified: "2024-03-13T09:15:00",
  },
];

export default function ContentCenter() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  // Filter content based on search, tab, and platform
  const filteredContent = mockContent.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === "all" || item.status === selectedTab;
    const matchesPlatform = selectedPlatform === "all" || item.platform === selectedPlatform;
    return matchesSearch && matchesTab && matchesPlatform;
  });

  // Analytics data
  const totalViews = mockContent.reduce((sum, item) => sum + item.views, 0);
  const averageEngagement = mockContent.reduce((sum, item) => sum + item.engagement, 0) / mockContent.length;
  const scheduledPosts = mockContent.filter(item => item.status === "scheduled").length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Center</h1>
        <Button color="primary">
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody className="flex items-center gap-4">
            <ChartBarIcon className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center gap-4">
            <ArrowUpIcon className="h-8 w-8 text-success" />
            <div>
              <p className="text-sm text-gray-500">Avg. Engagement</p>
              <p className="text-2xl font-bold">{averageEngagement.toFixed(1)}%</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center gap-4">
            <ChartBarIcon className="h-8 w-8 text-warning" />
            <div>
              <p className="text-sm text-gray-500">Scheduled Posts</p>
              <p className="text-2xl font-bold">{scheduledPosts}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Content Management */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow"
            endContent={<span className="material-icons">search</span>}
          />
          <div className="flex gap-4">
            <Select
              label="Platform"
              selectedKeys={new Set([selectedPlatform])}
              onSelectionChange={(keys) => setSelectedPlatform(Array.from(keys)[0] as string)}
              className="w-40"
            >
              <SelectItem key="all" textValue="All Platforms">All Platforms</SelectItem>
              <SelectItem key="facebook" textValue="Facebook">Facebook</SelectItem>
              <SelectItem key="instagram" textValue="Instagram">Instagram</SelectItem>
              <SelectItem key="twitter" textValue="Twitter">Twitter</SelectItem>
              <SelectItem key="linkedin" textValue="LinkedIn">LinkedIn</SelectItem>
            </Select>
            <Tabs selectedKey={selectedTab} onSelectionChange={(key) => setSelectedTab(key as string)}>
              <Tab key="all" title="All" />
              <Tab key="draft" title="Drafts" />
              <Tab key="scheduled" title="Scheduled" />
              <Tab key="published" title="Published" />
            </Tabs>
          </div>
        </CardHeader>
        <CardBody>
          <Table>
            <TableHeader>
              <TableColumn>TITLE</TableColumn>
              <TableColumn>TYPE</TableColumn>
              <TableColumn>PLATFORM</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ENGAGEMENT</TableColumn>
              <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Last modified: {new Date(item.lastModified).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge color="primary">{item.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge color="secondary">{item.platform}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      color={
                        item.status === "published"
                          ? "success"
                          : item.status === "scheduled"
                          ? "warning"
                          : "default"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.engagement}%</span>
                        <span>{item.views} views</span>
                      </div>
                      <Progress
                        value={item.engagement}
                        color={item.engagement > 75 ? "success" : item.engagement > 50 ? "warning" : "default"}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Tooltip content="Edit">
                        <Button
                          isIconOnly
                          variant="light"
                          onPress={() => console.log("Edit", item.id)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content="Delete">
                        <Button
                          isIconOnly
                          variant="light"
                          color="danger"
                          onPress={() => console.log("Delete", item.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
} 