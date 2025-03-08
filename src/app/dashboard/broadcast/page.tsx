"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
  Tabs,
  Tab,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  PaperAirplaneIcon,
  CalendarIcon,
  ClockIcon,
  ChartBarIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface Broadcast {
  id: number;
  title: string;
  content: string;
  channel: string;
  status: "sent" | "scheduled";
  scheduledFor?: string;
  sentAt?: string;
  metrics: {
    opens: number;
    clicks: number;
    conversions: number;
  };
}

// Mock data for demonstration
const mockBroadcasts: Broadcast[] = [
  {
    id: 1,
    title: "Summer Sale Announcement",
    content: "Get 50% off on all summer items!",
    channel: "email",
    status: "scheduled",
    scheduledFor: "2024-04-01T10:00:00",
    metrics: { opens: 245, clicks: 89, conversions: 12 },
  },
  {
    id: 2,
    title: "New Product Launch",
    content: "Introducing our latest innovation...",
    channel: "sms",
    status: "sent",
    sentAt: "2024-03-15T14:30:00",
    metrics: { opens: 1203, clicks: 456, conversions: 78 },
  },
];

export default function BroadcastPage() {
  const [activeTab, setActiveTab] = useState<string>("compose");
  const [selectedChannel, setSelectedChannel] = useState<string>("email");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [schedule, setSchedule] = useState("");
  const [time, setTime] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedBroadcast, setSelectedBroadcast] = useState<Broadcast | null>(null);

  const handleSend = () => {
    // Implement send logic
    console.log("Sending broadcast:", { title, content, selectedChannel });
  };

  const handleSchedule = () => {
    // Implement schedule logic
    console.log("Scheduling broadcast:", {
      title,
      content,
      selectedChannel,
      schedule,
      time,
    });
  };

  const handleDelete = (id: number) => {
    // Implement delete logic
    console.log("Deleting broadcast:", id);
  };

  const handleEdit = (broadcast: Broadcast) => {
    setSelectedBroadcast(broadcast);
    setTitle(broadcast.title);
    setContent(broadcast.content);
    setSelectedChannel(broadcast.channel);
    onOpen();
  };

  const handleTabChange = (value: any) => {
    setActiveTab(value.toString());
  };

  const handleChannelChange = (value: string) => {
    setSelectedChannel(value);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Broadcast Centre</h1>
          <p className="text-gray-500">Manage and send broadcasts to your audience</p>
        </CardHeader>
        <CardBody>
          <Tabs selectedKey={activeTab} onSelectionChange={handleTabChange}>
            <Tab key="compose" title="Compose">
              <div className="space-y-4 p-4">
                <Select
                  label="Channel"
                  selectedKeys={[selectedChannel]}
                  onSelectionChange={(keys) => handleChannelChange(Array.from(keys)[0] as string)}
                >
                  <SelectItem key="email">Email</SelectItem>
                  <SelectItem key="sms">SMS</SelectItem>
                  <SelectItem key="push">Push Notification</SelectItem>
                  <SelectItem key="social">Social Media</SelectItem>
                </Select>

                <Input
                  label="Title"
                  placeholder="Enter broadcast title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Textarea
                  label="Content"
                  placeholder="Enter your message"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={6}
                />

                <div className="flex gap-4">
                  <Input
                    type="date"
                    label="Schedule Date"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                  />
                  <Input
                    type="time"
                    label="Schedule Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="flex gap-4 justify-end">
                  <Button
                    variant="solid"
                    color="primary"
                    startContent={<PaperAirplaneIcon className="h-5 w-5" />}
                    onPress={handleSend}
                  >
                    Send Now
                  </Button>
                  <Button
                    variant="faded"
                    startContent={<CalendarIcon className="h-5 w-5" />}
                    onPress={handleSchedule}
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </Tab>

            <Tab key="history" title="History">
              <div className="p-4">
                <Table>
                  <TableHeader>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>CHANNEL</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>METRICS</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {mockBroadcasts.map((broadcast) => (
                      <TableRow key={broadcast.id}>
                        <TableCell>{broadcast.title}</TableCell>
                        <TableCell>
                          <Chip
                            color={
                              broadcast.channel === "email"
                                ? "primary"
                                : broadcast.channel === "sms"
                                ? "success"
                                : "warning"
                            }
                          >
                            {broadcast.channel}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Chip
                            color={broadcast.status === "sent" ? "success" : "warning"}
                            startContent={
                              broadcast.status === "sent" ? (
                                <CheckCircleIcon className="h-4 w-4" />
                              ) : (
                                <ClockIcon className="h-4 w-4" />
                              )
                            }
                          >
                            {broadcast.status}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Tooltip content="Opens">
                              <Chip size="sm" variant="faded">
                                👁️ {broadcast.metrics.opens}
                              </Chip>
                            </Tooltip>
                            <Tooltip content="Clicks">
                              <Chip size="sm" variant="faded">
                                🖱️ {broadcast.metrics.clicks}
                              </Chip>
                            </Tooltip>
                            <Tooltip content="Conversions">
                              <Chip size="sm" variant="faded">
                                💰 {broadcast.metrics.conversions}
                              </Chip>
                            </Tooltip>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              isIconOnly
                              variant="light"
                              onPress={() => handleEdit(broadcast)}
                            >
                              <PencilIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              isIconOnly
                              variant="light"
                              color="danger"
                              onPress={() => handleDelete(broadcast.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tab>

            <Tab key="analytics" title="Analytics">
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardBody>
                      <div className="flex items-center gap-2">
                        <ChartBarIcon className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm text-gray-500">Total Broadcasts</p>
                          <p className="text-2xl font-bold">1,234</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-5 w-5 text-success" />
                        <div>
                          <p className="text-sm text-gray-500">Successful Deliveries</p>
                          <p className="text-2xl font-bold">98.5%</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardBody>
                      <div className="flex items-center gap-2">
                        <ExclamationCircleIcon className="h-5 w-5 text-danger" />
                        <div>
                          <p className="text-sm text-gray-500">Bounce Rate</p>
                          <p className="text-2xl font-bold">1.5%</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Edit Broadcast</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
              />
              <Select
                label="Channel"
                selectedKeys={[selectedChannel]}
                onSelectionChange={(keys) => handleChannelChange(Array.from(keys)[0] as string)}
              >
                <SelectItem key="email">Email</SelectItem>
                <SelectItem key="sms">SMS</SelectItem>
                <SelectItem key="push">Push Notification</SelectItem>
                <SelectItem key="social">Social Media</SelectItem>
              </Select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>Cancel</Button>
            <Button color="primary" onPress={() => {
              if (selectedBroadcast) {
                console.log("Updating broadcast:", {
                  id: selectedBroadcast.id,
                  title,
                  content,
                  selectedChannel,
                });
              }
              onClose();
            }}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 