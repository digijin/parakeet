"use client";

import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Chip,
  Divider
} from "@heroui/react";
import { 
  GlobeAltIcon,
  HomeIcon,
  PhotoIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  PhoneIcon,
  MapPinIcon,
  ShareIcon,
  PencilIcon,
  PlusIcon,
  CalendarIcon,
  ShoppingBagIcon,
  TagIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface WebsiteStats {
  totalVisits: number;
  uniqueVisitors: number;
  avgTimeOnSite: string;
  bounceRate: number;
  conversionRate: number;
}

const mockStats: WebsiteStats = {
  totalVisits: 12500,
  uniqueVisitors: 8900,
  avgTimeOnSite: "2m 45s",
  bounceRate: 32.5,
  conversionRate: 4.2
};

export default function WebsitePage() {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Website Channel</h1>
          <p className="text-foreground/60">Manage your website and online presence</p>
        </div>
        <Button
          color="primary"
          startContent={<GlobeAltIcon className="w-5 h-5" />}
          onPress={() => window.location.href = '/dashboard/website/site-builder'}
        >
          Site Builder
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-foreground/60">Total Visits</p>
            <p className="text-2xl font-bold">{mockStats.totalVisits.toLocaleString()}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-foreground/60">Unique Visitors</p>
            <p className="text-2xl font-bold">{mockStats.uniqueVisitors.toLocaleString()}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-foreground/60">Avg. Time on Site</p>
            <p className="text-2xl font-bold">{mockStats.avgTimeOnSite}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-foreground/60">Bounce Rate</p>
            <p className="text-2xl font-bold">{mockStats.bounceRate}%</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-foreground/60">Conversion Rate</p>
            <p className="text-2xl font-bold">{mockStats.conversionRate}%</p>
          </CardBody>
        </Card>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Site Builder */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <WrenchScrewdriverIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Site Builder</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Button
                as={Link}
                href="/dashboard/website/site-builder"
                className="w-full justify-start"
                variant="flat"
              >
                <GlobeAltIcon className="w-5 h-5 mr-2" />
                Connect Domain
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/site-builder/themes"
                className="w-full justify-start"
                variant="flat"
              >
                <PhotoIcon className="w-5 h-5 mr-2" />
                Choose Theme
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/site-builder/pages"
                className="w-full justify-start"
                variant="flat"
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Manage Pages
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Homepage */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <HomeIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Homepage</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Button
                as={Link}
                href="/dashboard/website/homepage"
                className="w-full justify-start"
                variant="flat"
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Edit Homepage
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/homepage/contact"
                className="w-full justify-start"
                variant="flat"
              >
                <PhoneIcon className="w-5 h-5 mr-2" />
                Contact Form Settings
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/homepage/booking"
                className="w-full justify-start"
                variant="flat"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Booking Form Settings
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/homepage/social"
                className="w-full justify-start"
                variant="flat"
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                Social Links
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/homepage/maps"
                className="w-full justify-start"
                variant="flat"
              >
                <MapPinIcon className="w-5 h-5 mr-2" />
                Google Business Profile
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Showcase */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <PhotoIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Showcase</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Button
                as={Link}
                href="/dashboard/website/showcase"
                className="w-full justify-start"
                variant="flat"
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Manage Menu
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/showcase/products"
                className="w-full justify-start"
                variant="flat"
              >
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                Manage Products
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/showcase/services"
                className="w-full justify-start"
                variant="flat"
              >
                <WrenchScrewdriverIcon className="w-5 h-5 mr-2" />
                Manage Services
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/showcase/booking"
                className="w-full justify-start"
                variant="flat"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Booking Settings
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Blog */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <BookOpenIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Blog</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <Button
                as={Link}
                href="/dashboard/website/blog"
                className="w-full justify-start"
                variant="flat"
              >
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                All Posts
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/blog/new"
                className="w-full justify-start"
                variant="flat"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create New Post
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/blog/categories"
                className="w-full justify-start"
                variant="flat"
              >
                <TagIcon className="w-5 h-5 mr-2" />
                Manage Categories
              </Button>
              <Button
                as={Link}
                href="/dashboard/website/blog/schedule"
                className="w-full justify-start"
                variant="flat"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Schedule Posts
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
} 