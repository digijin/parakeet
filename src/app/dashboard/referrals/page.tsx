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
  Switch,
  Divider,
} from "@heroui/react";
import {
  GiftIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  ClipboardIcon,
  QrCodeIcon,
  CheckCircleIcon,
  XCircleIcon,
  CameraIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ShareIcon,
  TrophyIcon,
  TicketIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "ended";
  startDate: string;
  endDate: string;
  promotions: Promotion[];
}

interface Promotion {
  id: string;
  campaignId: string;
  type: "discount" | "reward" | "offer" | "competition";
  name: string;
  description: string;
  value: string;
  termsAndConditions: string;
  coupons: Coupon[];
  status: "active" | "paused" | "ended";
}

interface Coupon {
  id: string;
  promotionId: string;
  code: string;
  qrCode: string;
  barcode: string;
  status: "unused" | "used" | "expired";
  usedAt?: string;
  usedBy?: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: "camp1",
    name: "Summer Referral Program",
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    promotions: [],
  },
  {
    id: "camp2",
    name: "Friend Rewards",
    status: "active",
    startDate: "2024-05-01",
    endDate: "2024-12-31",
    promotions: [],
  },
];

const mockPromotions: Promotion[] = [
  {
    id: "promo1",
    campaignId: "camp1",
    type: "discount",
    name: "20% Off First Purchase",
    description: "Get 20% off your first purchase when referred by a friend",
    value: "20%",
    termsAndConditions: "Valid for new customers only. Cannot be combined with other offers.",
    coupons: [],
    status: "active",
  },
  {
    id: "promo2",
    campaignId: "camp2",
    type: "reward",
    name: "Refer & Earn",
    description: "Earn $10 for every friend you refer",
    value: "$10",
    termsAndConditions: "Reward issued after friend's first purchase. Maximum 10 referrals per month.",
    coupons: [],
    status: "active",
  },
];

const mockCoupons: Coupon[] = [
  {
    id: "coup1",
    promotionId: "promo1",
    code: "SUMMER20",
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
    barcode: "123456789",
    status: "unused",
  },
  {
    id: "coup2",
    promotionId: "promo1",
    code: "FRIEND10",
    qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA...",
    barcode: "987654321",
    status: "used",
    usedAt: "2024-03-15T14:30:00",
    usedBy: "john.doe@example.com",
  },
];

export default function ReferralsChannelPage() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [campaigns] = useState(mockCampaigns);
  const [promotions] = useState(mockPromotions);
  const [coupons, setCoupons] = useState(mockCoupons);
  const [modalMode, setModalMode] = useState<"campaign" | "promotion" | "coupon">("campaign");

  const handleCreateCampaign = () => {
    setModalMode("campaign");
    onOpen();
  };

  const handleCreatePromotion = (campaignId: string) => {
    setModalMode("promotion");
    onOpen();
  };

  const handleGenerateCoupons = (promotion: Promotion) => {
    setModalMode("coupon");
    onOpen();
  };

  const handleValidateCoupon = (code: string) => {
    const coupon = coupons.find(c => c.code === code);
    if (coupon && coupon.status === "unused") {
      setCoupons(coupons.map(c => 
        c.id === coupon.id 
          ? { ...c, status: "used", usedAt: new Date().toISOString() }
          : c
      ));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <GiftIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Referrals Channel</h1>
              <p className="text-gray-500">Manage your referral campaigns and promotions</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key.toString())}>
            <Tab key="campaigns" title="Campaigns">
              <div className="p-4 space-y-6">
                <div className="flex justify-end">
                  <Button
                    color="primary"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onPress={handleCreateCampaign}
                  >
                    New Campaign
                  </Button>
                </div>

                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="bg-content2">
                    <CardBody>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{campaign.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Chip color={campaign.status === "active" ? "success" : "warning"}>
                                {campaign.status}
                              </Chip>
                              <span>
                                {new Date(campaign.startDate).toLocaleDateString()} -
                                {new Date(campaign.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Button
                            color="primary"
                            variant="flat"
                            startContent={<PlusIcon className="w-4 h-4" />}
                            onPress={() => handleCreatePromotion(campaign.id)}
                          >
                            Add Promotion
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-medium">Promotions</h4>
                          <Table>
                            <TableHeader>
                              <TableColumn>NAME</TableColumn>
                              <TableColumn>TYPE</TableColumn>
                              <TableColumn>VALUE</TableColumn>
                              <TableColumn>STATUS</TableColumn>
                              <TableColumn>ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody>
                              {promotions
                                .filter((promo) => promo.campaignId === campaign.id)
                                .map((promotion) => (
                                  <TableRow key={promotion.id}>
                                    <TableCell>
                                      <div>
                                        <p className="font-medium">{promotion.name}</p>
                                        <p className="text-sm text-gray-500">{promotion.description}</p>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <Chip>{promotion.type}</Chip>
                                    </TableCell>
                                    <TableCell>{promotion.value}</TableCell>
                                    <TableCell>
                                      <Chip
                                        color={promotion.status === "active" ? "success" : "warning"}
                                      >
                                        {promotion.status}
                                      </Chip>
                                    </TableCell>
                                    <TableCell>
                                      <div className="flex gap-2">
                                        <Button
                                          variant="flat"
                                          startContent={<TicketIcon className="w-4 h-4" />}
                                          onPress={() => handleGenerateCoupons(promotion)}
                                        >
                                          Generate Coupons
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

            <Tab key="generator" title="Promo Generator">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Promotion Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Select
                            label="Promotion Type"
                            placeholder="Select type"
                          >
                            <SelectItem key="discount">Discount</SelectItem>
                            <SelectItem key="reward">Reward</SelectItem>
                            <SelectItem key="offer">Special Offer</SelectItem>
                            <SelectItem key="competition">Competition</SelectItem>
                          </Select>
                          <Input
                            label="Value"
                            placeholder="e.g., 20% or $10"
                          />
                        </div>
                      </div>

                      <Divider />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Coupon Settings</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              type="number"
                              label="Number of Coupons"
                              placeholder="Enter quantity"
                            />
                            <Input
                              label="Prefix"
                              placeholder="Optional prefix for codes"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <Switch defaultSelected />
                            <span>Generate QR Codes</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Switch defaultSelected />
                            <span>Generate Barcodes</span>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Terms & Conditions</h3>
                        <Textarea
                          label="Terms & Conditions"
                          placeholder="Enter the terms and conditions for this promotion"
                          rows={4}
                        />
                      </div>

                      <Divider />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Share Options</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Button
                            variant="flat"
                            startContent={<ShareIcon className="w-4 h-4" />}
                          >
                            Social Media
                          </Button>
                          <Button
                            variant="flat"
                            startContent={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                          >
                            Messenger
                          </Button>
                          <Button
                            variant="flat"
                            startContent={<EnvelopeIcon className="w-4 h-4" />}
                          >
                            Email
                          </Button>
                          <Button
                            variant="flat"
                            startContent={<MegaphoneIcon className="w-4 h-4" />}
                          >
                            Ads
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="flat">Preview</Button>
                        <Button color="primary">Generate</Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="validator" title="Coupon Validator">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Validate Coupon</h3>
                        <div className="space-y-4">
                          <div className="flex gap-4">
                            <Input
                              className="flex-1"
                              placeholder="Enter coupon code"
                            />
                            <Button
                              color="primary"
                              startContent={<CheckCircleIcon className="w-4 h-4" />}
                            >
                              Validate
                            </Button>
                          </div>
                          <div className="text-center p-8 border-2 border-dashed rounded-lg">
                            <CameraIcon className="w-12 h-12 mx-auto text-gray-400" />
                            <p className="mt-2">Scan QR Code</p>
                          </div>
                        </div>
                      </div>

                      <Divider />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Recent Validations</h3>
                        <Table>
                          <TableHeader>
                            <TableColumn>CODE</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                            <TableColumn>USED AT</TableColumn>
                            <TableColumn>USED BY</TableColumn>
                          </TableHeader>
                          <TableBody>
                            {coupons.map((coupon) => (
                              <TableRow key={coupon.id}>
                                <TableCell>{coupon.code}</TableCell>
                                <TableCell>
                                  <Chip
                                    color={coupon.status === "unused" ? "success" : "default"}
                                    startContent={
                                      coupon.status === "unused" 
                                        ? <CheckCircleIcon className="w-4 h-4" />
                                        : <XCircleIcon className="w-4 h-4" />
                                    }
                                  >
                                    {coupon.status}
                                  </Chip>
                                </TableCell>
                                <TableCell>
                                  {coupon.usedAt 
                                    ? new Date(coupon.usedAt).toLocaleString()
                                    : "-"
                                  }
                                </TableCell>
                                <TableCell>{coupon.usedBy || "-"}</TableCell>
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
            {modalMode === "campaign" 
              ? "Create Campaign"
              : modalMode === "promotion"
              ? "Add Promotion"
              : "Generate Coupons"
            }
          </ModalHeader>
          <ModalBody>
            {modalMode === "campaign" && (
              <div className="space-y-4">
                <Input
                  label="Campaign Name"
                  placeholder="Enter campaign name"
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
            )}
            {modalMode === "promotion" && (
              <div className="space-y-4">
                <Input
                  label="Promotion Name"
                  placeholder="Enter promotion name"
                />
                <Select
                  label="Type"
                  placeholder="Select promotion type"
                >
                  <SelectItem key="discount">Discount</SelectItem>
                  <SelectItem key="reward">Reward</SelectItem>
                  <SelectItem key="offer">Special Offer</SelectItem>
                  <SelectItem key="competition">Competition</SelectItem>
                </Select>
                <Input
                  label="Value"
                  placeholder="e.g., 20% or $10"
                />
                <Textarea
                  label="Description"
                  placeholder="Enter promotion description"
                />
              </div>
            )}
            {modalMode === "coupon" && (
              <div className="space-y-4">
                <Input
                  type="number"
                  label="Number of Coupons"
                  placeholder="Enter quantity"
                />
                <div className="flex items-center gap-4">
                  <Switch defaultSelected />
                  <span>Generate QR Codes</span>
                </div>
                <div className="flex items-center gap-4">
                  <Switch defaultSelected />
                  <span>Generate Barcodes</span>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button color="primary">
              {modalMode === "campaign"
                ? "Create Campaign"
                : modalMode === "promotion"
                ? "Add Promotion"
                : "Generate Coupons"
              }
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 