"use client";

import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import {
  GlobeAltIcon,
  HomeIcon,
  PhotoIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const sections = [
  {
    title: "Site Builder",
    description: "Configure your website settings, domain, and theme",
    icon: Cog6ToothIcon,
    href: "/dashboard/website/builder",
    features: ["Domain registration", "Theme selection", "Page management"],
  },
  {
    title: "Homepage",
    description: "Manage your homepage content and settings",
    icon: HomeIcon,
    href: "/dashboard/website/homepage",
    features: ["Contact form", "Phone tracking", "Social integration"],
  },
  {
    title: "Showcase",
    description: "Manage your menu, products, and services",
    icon: PhotoIcon,
    href: "/dashboard/website/showcase",
    features: ["Menu items", "Product catalog", "Service listings"],
  },
  {
    title: "Blog",
    description: "Manage your blog posts and categories",
    icon: DocumentTextIcon,
    href: "/dashboard/website/blog",
    features: ["Post management", "Categories", "Social sharing"],
  },
];

export default function WebsiteChannelPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GlobeAltIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Website Channel</h1>
              <p className="text-gray-500">Manage your website presence</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section) => (
              <Card key={section.title} className="bg-content2">
                <CardBody>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <section.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                      <p className="text-gray-500 mb-4">{section.description}</p>
                      <ul className="space-y-2 mb-4">
                        {section.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={section.href}>
                        <Button
                          variant="flat"
                          color="primary"
                          className="w-full"
                        >
                          Manage {section.title}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 