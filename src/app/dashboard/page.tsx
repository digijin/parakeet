"use client";

import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Divider,
  Progress,
  Chip,
  Avatar,
  Tooltip
} from "@heroui/react";
import Link from "next/link";
import { 
  ChartBarIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  QuestionMarkCircleIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

export default function Dashboard() {
  // Mock data - replace with real data from your backend
  const analytics = {
    totalViews: 12500,
    engagement: 68,
    growth: 12.5,
    topContent: [
      { title: "Summer Campaign", views: 3200, growth: 8.2 },
      { title: "Product Launch", views: 2800, growth: 15.4 },
      { title: "Brand Story", views: 2100, growth: 5.7 }
    ]
  };

  const social = {
    twitter: {
      followers: 12500,
      engagement: 4.2,
      growth: 8.5,
      recentPosts: [
        { content: "Excited to announce our new feature!", engagement: 245 },
        { content: "Join us for our upcoming webinar", engagement: 189 }
      ]
    },
    bluesky: {
      followers: 3200,
      engagement: 6.8,
      growth: 15.2,
      recentPosts: [
        { content: "Check out our latest blog post", engagement: 156 },
        { content: "New community guidelines", engagement: 98 }
      ]
    },
    facebook: {
      followers: 8900,
      engagement: 3.9,
      growth: 5.7,
      recentPosts: [
        { content: "Product showcase video", engagement: 312 },
        { content: "Customer success story", engagement: 267 }
      ]
    },
    email: {
      subscribers: 15600,
      openRate: 42.5,
      clickRate: 12.8,
      recentCampaigns: [
        { name: "March Newsletter", opens: 6234 },
        { name: "Product Update", opens: 5891 }
      ]
    }
  };

  const tasks = [
    { id: 1, title: "Review Q2 Analytics", due: "2024-03-25", priority: "high" },
    { id: 2, title: "Update Social Media Calendar", due: "2024-03-26", priority: "medium" },
    { id: 3, title: "Optimize Landing Page SEO", due: "2024-03-27", priority: "high" },
    { id: 4, title: "Schedule Weekly Newsletter", due: "2024-03-28", priority: "low" }
  ];

  const calendar = [
    { date: "2024-03-25", events: ["Team Meeting", "Content Review"] },
    { date: "2024-03-26", events: ["Product Launch"] },
    { date: "2024-03-27", events: ["SEO Workshop"] },
    { date: "2024-03-28", events: ["Client Presentation"] }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Channel Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Button
          as={Link}
          href="/dashboard/content"
          className="h-24 flex flex-col items-center justify-center gap-2"
          variant="flat"
        >
          <DocumentTextIcon className="w-6 h-6" />
          <span>Content Centre</span>
        </Button>
        <Button
          as={Link}
          href="/dashboard/seo"
          className="h-24 flex flex-col items-center justify-center gap-2"
          variant="flat"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
          <span>SEO Centre</span>
        </Button>
        <Button
          as={Link}
          href="/dashboard/broadcast"
          className="h-24 flex flex-col items-center justify-center gap-2"
          variant="flat"
        >
          <MegaphoneIcon className="w-6 h-6" />
          <span>Broadcast Centre</span>
        </Button>
        <Button
          as={Link}
          href="/dashboard/help"
          className="h-24 flex flex-col items-center justify-center gap-2"
          variant="flat"
        >
          <QuestionMarkCircleIcon className="w-6 h-6" />
          <span>Contact / Help</span>
        </Button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analytics Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Analytics Overview</h2>
            </div>
            <Button variant="flat" size="sm">View Details</Button>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-content2 rounded-lg">
                <p className="text-sm text-foreground/80">Total Views</p>
                <p className="text-2xl font-bold">{analytics.totalViews.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-content2 rounded-lg">
                <p className="text-sm text-foreground/80">Engagement Rate</p>
                <p className="text-2xl font-bold">{analytics.engagement}%</p>
              </div>
              <div className="p-4 bg-content2 rounded-lg">
                <p className="text-sm text-foreground/80">Growth</p>
                <p className="text-2xl font-bold text-success">+{analytics.growth}%</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Top Performing Content</h3>
              <div className="space-y-4">
                {analytics.topContent.map((content, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{content.title}</span>
                      <span className="text-success">+{content.growth}%</span>
                    </div>
                    <Progress 
                      value={content.views / analytics.totalViews * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Tasks Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Tasks</h2>
            </div>
            <Button variant="flat" size="sm">View All</Button>
          </CardHeader>
          <CardBody className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-content2 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-foreground/60">Due: {task.due}</p>
                </div>
                <Chip color={getPriorityColor(task.priority)} variant="flat">
                  {task.priority}
                </Chip>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Social Media Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Social Media</h2>
            </div>
            <Button variant="flat" size="sm">View All</Button>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Twitter */}
              <div className="p-4 bg-content2 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar name="X" className="bg-black text-white" size="sm" />
                  <h3 className="font-semibold">Twitter</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground/80">Followers: {social.twitter.followers.toLocaleString()}</p>
                  <p className="text-sm text-foreground/80">Engagement: {social.twitter.engagement}%</p>
                  <p className="text-sm text-success">Growth: +{social.twitter.growth}%</p>
                </div>
                <div className="mt-3 pt-3 border-t border-divider">
                  <p className="text-sm font-medium mb-1">Recent Posts</p>
                  {social.twitter.recentPosts.map((post, index) => (
                    <div key={index} className="text-sm text-foreground/80">
                      {post.content} ({post.engagement} engagements)
                    </div>
                  ))}
                </div>
              </div>

              {/* Bluesky */}
              <div className="p-4 bg-content2 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar name="BS" className="bg-blue-500 text-white" size="sm" />
                  <h3 className="font-semibold">Bluesky</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground/80">Followers: {social.bluesky.followers.toLocaleString()}</p>
                  <p className="text-sm text-foreground/80">Engagement: {social.bluesky.engagement}%</p>
                  <p className="text-sm text-success">Growth: +{social.bluesky.growth}%</p>
                </div>
                <div className="mt-3 pt-3 border-t border-divider">
                  <p className="text-sm font-medium mb-1">Recent Posts</p>
                  {social.bluesky.recentPosts.map((post, index) => (
                    <div key={index} className="text-sm text-foreground/80">
                      {post.content} ({post.engagement} engagements)
                    </div>
                  ))}
                </div>
              </div>

              {/* Facebook */}
              <div className="p-4 bg-content2 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar name="FB" className="bg-blue-600 text-white" size="sm" />
                  <h3 className="font-semibold">Facebook</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground/80">Followers: {social.facebook.followers.toLocaleString()}</p>
                  <p className="text-sm text-foreground/80">Engagement: {social.facebook.engagement}%</p>
                  <p className="text-sm text-success">Growth: +{social.facebook.growth}%</p>
                </div>
                <div className="mt-3 pt-3 border-t border-divider">
                  <p className="text-sm font-medium mb-1">Recent Posts</p>
                  {social.facebook.recentPosts.map((post, index) => (
                    <div key={index} className="text-sm text-foreground/80">
                      {post.content} ({post.engagement} engagements)
                    </div>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="p-4 bg-content2 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar name="EM" className="bg-green-500 text-white" size="sm" />
                  <h3 className="font-semibold">Email</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-foreground/80">Subscribers: {social.email.subscribers.toLocaleString()}</p>
                  <p className="text-sm text-foreground/80">Open Rate: {social.email.openRate}%</p>
                  <p className="text-sm text-foreground/80">Click Rate: {social.email.clickRate}%</p>
                </div>
                <div className="mt-3 pt-3 border-t border-divider">
                  <p className="text-sm font-medium mb-1">Recent Campaigns</p>
                  {social.email.recentCampaigns.map((campaign, index) => (
                    <div key={index} className="text-sm text-foreground/80">
                      {campaign.name} ({campaign.opens.toLocaleString()} opens)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Calendar Overview */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Calendar</h2>
            </div>
            <Button variant="flat" size="sm">View Calendar</Button>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {calendar.map((day, index) => (
                <div key={index} className="p-4 bg-content2 rounded-lg">
                  <p className="font-semibold mb-2">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                  <div className="space-y-2">
                    {day.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="text-sm p-2 bg-background rounded">
                        {event}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}