"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ShareIcon,
  TagIcon,
  CalendarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  tags: string[];
  status: "draft" | "published" | "scheduled";
  publishDate?: string;
  author: string;
  socialShare?: {
    facebook?: boolean;
    twitter?: boolean;
    linkedin?: boolean;
  };
}

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Getting Started with Digital Marketing",
    content: "Learn the basics of digital marketing...",
    category: "Marketing",
    tags: ["digital", "beginner", "guide"],
    status: "published",
    publishDate: "2024-03-15",
    author: "John Doe",
    socialShare: {
      facebook: true,
      twitter: true,
      linkedin: false,
    },
  },
  {
    id: 2,
    title: "Advanced SEO Techniques",
    content: "Discover advanced SEO strategies...",
    category: "SEO",
    tags: ["seo", "advanced", "techniques"],
    status: "scheduled",
    publishDate: "2024-04-01",
    author: "Jane Smith",
    socialShare: {
      facebook: true,
      twitter: true,
      linkedin: true,
    },
  },
];

const categories = ["Marketing", "SEO", "Social Media", "Content Strategy", "Analytics"];
const tags = ["digital", "beginner", "guide", "seo", "advanced", "techniques", "social", "analytics"];

export default function BlogRollPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleAdd = () => {
    setEditPost(null);
    onOpen();
  };

  const handleEdit = (post: Post) => {
    setEditPost(post);
    onOpen();
  };

  const handleDelete = (id: number) => {
    setPosts(posts => posts.filter(post => post.id !== id));
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(tags =>
      tags.includes(tag)
        ? tags.filter(t => t !== tag)
        : [...tags, tag]
    );
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 ||
                       selectedTags.some(tag => post.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Blog Roll</h1>
              <p className="text-gray-500">Manage your blog posts and content</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startContent={<MagnifyingGlassIcon className="w-4 h-4" />}
                className="w-full md:w-64"
              />
              <Select
                placeholder="Filter by category"
                selectedKeys={[selectedCategory]}
                onChange={(e) => setSelectedCategory(e.target.value)}
                startContent={<FunnelIcon className="w-4 h-4" />}
                className="w-full md:w-48"
              >
                <SelectItem key="all" value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </Select>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`cursor-pointer ${
                      selectedTags.includes(tag) ? "bg-primary text-white" : ""
                    }`}
                  >
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                color="primary"
                startContent={<PlusIcon className="w-5 h-5" />}
                onPress={handleAdd}
              >
                Create Post
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableColumn>TITLE</TableColumn>
                <TableColumn>CATEGORY</TableColumn>
                <TableColumn>TAGS</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>PUBLISH DATE</TableColumn>
                <TableColumn>SOCIAL SHARE</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-gray-500">{post.author}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip>{post.category}</Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <Chip key={tag} size="sm">{tag}</Chip>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        color={
                          post.status === "published"
                            ? "success"
                            : post.status === "scheduled"
                            ? "warning"
                            : "default"
                        }
                      >
                        {post.status}
                      </Chip>
                    </TableCell>
                    <TableCell>{post.publishDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {post.socialShare?.facebook && (
                          <Chip size="sm" variant="flat">FB</Chip>
                        )}
                        {post.socialShare?.twitter && (
                          <Chip size="sm" variant="flat">TW</Chip>
                        )}
                        {post.socialShare?.linkedin && (
                          <Chip size="sm" variant="flat">LI</Chip>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              variant="light"
                            >
                              <ShareIcon className="w-4 h-4" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem key="facebook">Share to Facebook</DropdownItem>
                            <DropdownItem key="twitter">Share to Twitter</DropdownItem>
                            <DropdownItem key="linkedin">Share to LinkedIn</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                        <Button
                          isIconOnly
                          variant="light"
                          onPress={() => handleEdit(post)}
                        >
                          <PencilIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          isIconOnly
                          variant="light"
                          color="danger"
                          onPress={() => handleDelete(post.id)}
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
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            {editPost ? "Edit Post" : "Create New Post"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Title"
                placeholder="Enter post title"
                value={editPost?.title || ""}
              />
              <Textarea
                label="Content"
                placeholder="Write your post content..."
                value={editPost?.content || ""}
                rows={8}
              />
              <div className="flex gap-4">
                <Select
                  label="Category"
                  selectedKeys={[editPost?.category || ""]}
                  className="flex-1"
                >
                  {categories.map((category) => (
                    <SelectItem key={category}>{category}</SelectItem>
                  ))}
                </Select>
                <Input
                  type="date"
                  label="Publish Date"
                  value={editPost?.publishDate || ""}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      onClick={() => {}}
                      className="cursor-pointer"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2">Social Share</label>
                <div className="flex gap-4">
                  <Switch
                    isSelected={editPost?.socialShare?.facebook}
                  />
                  <span>Facebook</span>
                  <Switch
                    isSelected={editPost?.socialShare?.twitter}
                  />
                  <span>Twitter</span>
                  <Switch
                    isSelected={editPost?.socialShare?.linkedin}
                  />
                  <span>LinkedIn</span>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button color="primary">Save Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 