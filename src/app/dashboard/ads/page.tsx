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
  MegaphoneIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PauseIcon,
  PlayIcon,
  DocumentDuplicateIcon,
  ChartBarIcon,
  PhotoIcon,
  LinkIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "completed";
  platform: string;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}

interface Ad {
  id: string;
  campaignId: string;
  type: "retargeting" | "split-test" | "standalone";
  platform: string;
  headline: string;
  tagline: string;
  body: string;
  image: string;
  destination: string;
  audience: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: "active" | "paused" | "completed";
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
}

const mockCampaigns: Campaign[] = [
  {
    id: "camp1",
    name: "Summer Sale 2024",
    status: "active",
    platform: "Facebook",
    budget: 5000,
    spent: 2345.67,
    startDate: "2024-06-01",
    endDate: "2024-06-30",
    performance: {
      impressions: 150000,
      clicks: 4500,
      conversions: 120,
      ctr: 3.0,
      cpc: 0.52,
    },
  },
  {
    id: "camp2",
    name: "Product Launch",
    status: "paused",
    platform: "Instagram",
    budget: 3000,
    spent: 1234.56,
    startDate: "2024-05-15",
    endDate: "2024-05-30",
    performance: {
      impressions: 80000,
      clicks: 2800,
      conversions: 75,
      ctr: 3.5,
      cpc: 0.44,
    },
  },
];

const mockAds: Ad[] = [
  {
    id: "ad1",
    campaignId: "camp1",
    type: "retargeting",
    platform: "Facebook",
    headline: "Summer Sale - Up to 50% Off!",
    tagline: "Limited Time Only",
    body: "Don't miss out on our biggest sale of the year. Shop now and save big on all your favorite items.",
    image: "/ads/summer-sale.jpg",
    destination: "/summer-sale",
    audience: "Website Visitors - Last 30 days",
    budget: 2000,
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    status: "active",
    performance: {
      impressions: 75000,
      clicks: 2250,
      conversions: 60,
      ctr: 3.0,
      cpc: 0.52,
    },
  },
  {
    id: "ad2",
    campaignId: "camp2",
    type: "standalone",
    platform: "Instagram",
    headline: "Introducing Our New Collection",
    tagline: "Elegance Meets Comfort",
    body: "Discover our latest collection designed for the modern lifestyle. Premium quality at affordable prices.",
    image: "/ads/new-collection.jpg",
    destination: "/new-collection",
    audience: "Fashion Enthusiasts, Age 25-45",
    budget: 1500,
    startDate: "2024-05-15",
    endDate: "2024-05-30",
    status: "paused",
    performance: {
      impressions: 40000,
      clicks: 1400,
      conversions: 35,
      ctr: 3.5,
      cpc: 0.44,
    },
  },
];

export default function AdChannelPage() {
  const [activeTab, setActiveTab] = useState("existing");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [ads, setAds] = useState(mockAds);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [isCreatingAd, setIsCreatingAd] = useState(false);
  const [newAd, setNewAd] = useState<Partial<Ad>>({
    type: "standalone",
    platform: "Facebook",
    status: "active",
  });

  const handleCreateAd = () => {
    setIsCreatingAd(true);
    setNewAd({
      type: "standalone",
      platform: "Facebook",
      status: "active",
    });
    onOpen();
  };

  const handleEditAd = (ad: Ad) => {
    setIsCreatingAd(false);
    setSelectedAd(ad);
    onOpen();
  };

  const handleToggleAdStatus = (adId: string) => {
    setAds(ads.map(ad => 
      ad.id === adId 
        ? { ...ad, status: ad.status === "active" ? "paused" : "active" }
        : ad
    ));
  };

  const handleDuplicateAd = (ad: Ad) => {
    const newAd = {
      ...ad,
      id: `ad${Date.now()}`,
      name: `${ad.headline} (Copy)`,
    };
    setAds([...ads, newAd]);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MegaphoneIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Ad Channel</h1>
              <p className="text-gray-500">Manage your advertising campaigns</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key.toString())}>
            <Tab key="existing" title="Existing Ads">
              <div className="p-4 space-y-6">
                {/* Campaigns Overview */}
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="bg-content2">
                    <CardBody>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{campaign.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Chip>{campaign.platform}</Chip>
                              <Chip color={campaign.status === "active" ? "success" : "warning"}>
                                {campaign.status}
                              </Chip>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="flat"
                              startContent={<ChartBarIcon className="w-4 h-4" />}
                            >
                              Analytics
                            </Button>
                            <Button
                              variant="flat"
                              startContent={<PencilIcon className="w-4 h-4" />}
                            >
                              Edit
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Budget</p>
                            <p className="font-semibold">${campaign.budget.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">
                              Spent: ${campaign.spent.toLocaleString()}
                            </p>
                            <Progress
                              value={(campaign.spent / campaign.budget) * 100}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Performance</p>
                            <div className="space-y-1">
                              <p className="text-sm">
                                Impressions: {campaign.performance.impressions.toLocaleString()}
                              </p>
                              <p className="text-sm">
                                Clicks: {campaign.performance.clicks.toLocaleString()}
                              </p>
                              <p className="text-sm">
                                CTR: {campaign.performance.ctr}%
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Conversions</p>
                            <p className="font-semibold">
                              {campaign.performance.conversions.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              CPC: ${campaign.performance.cpc}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Duration</p>
                            <p className="text-sm">
                              {new Date(campaign.startDate).toLocaleDateString()} -
                              {new Date(campaign.endDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Campaign Ads</h4>
                          <Table>
                            <TableHeader>
                              <TableColumn>AD</TableColumn>
                              <TableColumn>TYPE</TableColumn>
                              <TableColumn>PERFORMANCE</TableColumn>
                              <TableColumn>STATUS</TableColumn>
                              <TableColumn>ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody>
                              {ads
                                .filter((ad) => ad.campaignId === campaign.id)
                                .map((ad) => (
                                  <TableRow key={ad.id}>
                                    <TableCell>
                                      <div>
                                        <p className="font-medium">{ad.headline}</p>
                                        <p className="text-sm text-gray-500">{ad.tagline}</p>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Chip>{ad.type}</Chip>
                                    </TableCell>
                                    <TableCell>
                                      <div className="space-y-1">
                                        <p className="text-sm">CTR: {ad.performance.ctr}%</p>
                                        <p className="text-sm">
                                          Conversions: {ad.performance.conversions}
                                        </p>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Chip
                                        color={ad.status === "active" ? "success" : "warning"}
                                      >
                                        {ad.status}
                                      </Chip>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex gap-2">
                                        <Button
                                          isIconOnly
                                          variant="light"
                                          onPress={() => handleToggleAdStatus(ad.id)}
                                        >
                                          {ad.status === "active" ? (
                                            <PauseIcon className="w-4 h-4" />
                                          ) : (
                                            <PlayIcon className="w-4 h-4" />
                                          )}
                                        </Button>
                                        <Button
                                          isIconOnly
                                          variant="light"
                                          onPress={() => handleEditAd(ad)}
                                        >
                                          <PencilIcon className="w-4 h-4" />
                                        </Button>
                                        <Button
                                          isIconOnly
                                          variant="light"
                                          onPress={() => handleDuplicateAd(ad)}
                                        >
                                          <DocumentDuplicateIcon className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </Tab>

            <Tab key="create" title="Create Ad">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Ad Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Select
                            label="Ad Type"
                            placeholder="Select ad type"
                          >
                            <SelectItem key="retargeting">Retargeting</SelectItem>
                            <SelectItem key="split-test">Split Test</SelectItem>
                            <SelectItem key="standalone">Stand-alone</SelectItem>
                          </Select>
                          <Select
                            label="Campaign"
                            placeholder="Select campaign"
                          >
                            <>
                              <SelectItem key="new">Create New Campaign</SelectItem>
                              {campaigns.map((campaign) => (
                                <SelectItem key={campaign.id}>{campaign.name}</SelectItem>
                              ))}
                            </>
                          </Select>
                          <Select
                            label="Platform"
                            placeholder="Select platform"
                          >
                            <SelectItem key="facebook">Facebook</SelectItem>
                            <SelectItem key="instagram">Instagram</SelectItem>
                            <SelectItem key="twitter">Twitter</SelectItem>
                          </Select>
                          <Select
                            label="Audience"
                            placeholder="Select audience"
                          >
                            <SelectItem key="pixel">Website Visitors (Pixel)</SelectItem>
                            <SelectItem key="custom">Custom Audience</SelectItem>
                            <SelectItem key="lookalike">Lookalike Audience</SelectItem>
                          </Select>
                        </div>
                      </div>

                      <Divider />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Creative</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              label="Headline"
                              placeholder="Enter main headline"
                            />
                            <Input
                              label="Tagline"
                              placeholder="Enter supporting tagline"
                            />
                          </div>
                          <Textarea
                            label="Body Text"
                            placeholder="Enter ad body text"
                            rows={4}
                          />
                          <div className="border-2 border-dashed rounded-lg p-8 text-center">
                            <PhotoIcon className="w-12 h-12 mx-auto text-gray-400" />
                            <p className="mt-2">Drop your ad images here or click to upload</p>
                          </div>
                          <Select
                            label="Destination"
                            placeholder="Select destination"
                          >
                            <SelectItem key="social">Social Post</SelectItem>
                            <SelectItem key="page">Landing Page</SelectItem>
                            <SelectItem key="blog">Blog Post</SelectItem>
                          </Select>
                        </div>
                      </div>

                      <Divider />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Budget & Schedule</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            type="number"
                            label="Budget"
                            placeholder="Enter budget"
                            startContent={<CurrencyDollarIcon className="w-4 h-4" />}
                          />
                          <div className="flex gap-4">
                            <Input
                              type="date"
                              label="Start Date"
                              className="flex-1"
                            />
                            <Input
                              type="date"
                              label="End Date"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="flat">Save as Draft</Button>
                        <Button color="primary">Create Ad</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalContent>
          <ModalHeader>
            {isCreatingAd ? "Create New Ad" : "Edit Ad"}
          </ModalHeader>
          <ModalBody>
            {/* Ad edit form - similar to create form but with pre-filled values */}
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