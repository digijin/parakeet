"use client";

import { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Input,
  Textarea,
  Switch,
  Select,
  SelectItem,
  Divider,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab
} from "@heroui/react";
import { 
  DocumentTextIcon,
  TagIcon,
  CalendarIcon,
  ShareIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  EyeIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

type PostStatus = "draft" | "published" | "scheduled";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: PostStatus;
  publishDate?: string;
  image?: string;
  views: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const mockCategories: Category[] = [
  { id: "news", name: "News", slug: "news" },
  { id: "tutorials", name: "Tutorials", slug: "tutorials" },
  { id: "guides", name: "Guides", slug: "guides" }
];

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Our Platform",
    content: "Lorem ipsum dolor sit amet...",
    excerpt: "Learn how to get started with our platform in this comprehensive guide.",
    author: "John Doe",
    category: "guides",
    tags: ["getting-started", "tutorial"],
    status: "published",
    publishDate: "2024-03-20",
    image: "/blog/getting-started.jpg",
    views: 1250
  },
  {
    id: "2",
    title: "New Features Released",
    content: "Lorem ipsum dolor sit amet...",
    excerpt: "Check out our latest features and improvements.",
    author: "Jane Smith",
    category: "news",
    tags: ["updates", "features"],
    status: "scheduled",
    publishDate: "2024-03-25",
    image: "/blog/new-features.jpg",
    views: 0
  },
  {
    id: "3",
    title: "Best Practices Guide",
    content: "Lorem ipsum dolor sit amet...",
    excerpt: "Learn the best practices for using our platform effectively.",
    author: "John Doe",
    category: "tutorials",
    tags: ["best-practices", "guide"],
    status: "draft",
    image: "/blog/best-practices.jpg",
    views: 0
  }
];

export default function BlogPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author: "",
    category: "",
    tags: "",
    status: "draft" as PostStatus,
    publishDate: "",
    image: ""
  });

  const filteredPosts = posts.filter(post => {
    const statusMatch = selectedTab === "all" || post.status === selectedTab;
    const categoryMatch = selectedCategory === "all" || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && categoryMatch && searchMatch;
  });

  const handleAddPost = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      author: "",
      category: "",
      tags: "",
      status: "draft",
      publishDate: "",
      image: ""
    });
    setIsModalOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      author: post.author,
      category: post.category,
      tags: post.tags.join(", "),
      status: post.status,
      publishDate: post.publishDate || "",
      image: post.image || ""
    });
    setIsModalOpen(true);
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleSavePost = () => {
    const newPost: Post = {
      id: editingPost?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      author: formData.author,
      category: formData.category,
      tags: formData.tags.split(",").map(tag => tag.trim()),
      status: formData.status,
      publishDate: formData.publishDate || undefined,
      image: formData.image || undefined,
      views: editingPost?.views || 0
    };

    setPosts(editingPost
      ? posts.map(post => post.id === editingPost.id ? newPost : post)
      : [...posts, newPost]
    );
    setIsModalOpen(false);
  };

  const handleSharePost = (post: Post) => {
    // Implement social sharing functionality
    console.log("Sharing post:", post);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Button
          color="primary"
          startContent={<PlusIcon className="w-5 h-5" />}
          onPress={handleAddPost}
        >
          New Post
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardBody className="flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Search posts..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select
            label="Status"
            className="w-48"
            selectedKeys={[selectedTab]}
            onChange={(e) => setSelectedTab(e.target.value)}
          >
            <SelectItem key="all" textValue="All Posts">
              All Posts
            </SelectItem>
            <SelectItem key="draft" textValue="Drafts">
              Drafts
            </SelectItem>
            <SelectItem key="published" textValue="Published">
              Published
            </SelectItem>
            <SelectItem key="scheduled" textValue="Scheduled">
              Scheduled
            </SelectItem>
          </Select>
          <Select
            label="Category"
            className="w-48"
            selectedKeys={[selectedCategory]}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <SelectItem key="all" textValue="All Categories">
              All Categories
            </SelectItem>
            {mockCategories.map(category => (
              <SelectItem key={category.id} textValue={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
        </CardBody>
      </Card>

      {/* Posts List */}
      <Card>
        <CardBody>
          <div className="space-y-4">
            {filteredPosts.map(post => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 bg-content2 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {post.image && (
                    <div className="w-16 h-16 bg-content3 rounded-lg overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{post.title}</p>
                      <Chip
                        size="sm"
                        color={
                          post.status === "published" ? "success" :
                          post.status === "scheduled" ? "warning" : "default"
                        }
                        variant="flat"
                      >
                        {post.status}
                      </Chip>
                    </div>
                    <p className="text-sm text-foreground/60">{post.excerpt}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-foreground/60">By {post.author}</span>
                      <Chip size="sm" variant="flat">{post.category}</Chip>
                      {post.publishDate && (
                        <div className="flex items-center gap-1 text-sm text-foreground/60">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(post.publishDate).toLocaleDateString()}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-sm text-foreground/60">
                        <EyeIcon className="w-4 h-4" />
                        {post.views}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => handleSharePost(post)}
                  >
                    <ShareIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => handleEditPost(post)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={() => handleDeletePost(post.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            {editingPost ? "Edit Post" : "New Post"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Textarea
                label="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
              <Textarea
                label="Excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              />
              <Input
                label="Author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              />
              <Select
                label="Category"
                selectedKeys={[formData.category]}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {mockCategories.map(category => (
                  <SelectItem key={category.id} textValue={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
              <Input
                label="Tags (comma-separated)"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <Input
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <Select
                label="Status"
                selectedKeys={[formData.status]}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as PostStatus })}
              >
                <SelectItem key="draft" textValue="Draft">
                  Draft
                </SelectItem>
                <SelectItem key="published" textValue="Published">
                  Published
                </SelectItem>
                <SelectItem key="scheduled" textValue="Scheduled">
                  Scheduled
                </SelectItem>
              </Select>
              {formData.status === "scheduled" && (
                <Input
                  type="datetime-local"
                  label="Publish Date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSavePost}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 