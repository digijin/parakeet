"use client";

import { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader,
  Button,
  Select,
  SelectItem,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Chip
} from "@heroui/react";
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Bars3Icon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";

interface Channel {
  id: string;
  name: string;
}

interface Campaign {
  id: string;
  name: string;
}

interface Event {
  id: number;
  title: string;
  channel: string;
  campaign: string;
  date: string;
  time: string;
  content: string;
  status: string;
}

interface FormData {
  title: string;
  channel: string;
  campaign: string;
  date: string;
  time: string;
  content: string;
}

// Mock data
const channels: Channel[] = [
  { id: "all", name: "All Channels" },
  { id: "twitter", name: "Twitter" },
  { id: "bluesky", name: "Bluesky" },
  { id: "facebook", name: "Facebook" },
  { id: "email", name: "Email" }
];

const campaigns: Campaign[] = [
  { id: "all", name: "All Campaigns" },
  { id: "summer2024", name: "Summer 2024" },
  { id: "product-launch", name: "Product Launch" },
  { id: "brand-awareness", name: "Brand Awareness" }
];

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Product Launch Announcement",
    channel: "twitter",
    campaign: "product-launch",
    date: "2024-03-25",
    time: "10:00",
    content: "Excited to announce our new feature! 🚀",
    status: "scheduled"
  },
  {
    id: 2,
    title: "Weekly Newsletter",
    channel: "email",
    campaign: "brand-awareness",
    date: "2024-03-26",
    time: "09:00",
    content: "March Newsletter - Industry Updates",
    status: "scheduled"
  },
  {
    id: 3,
    title: "Summer Campaign Teaser",
    channel: "facebook",
    campaign: "summer2024",
    date: "2024-03-27",
    time: "14:00",
    content: "Get ready for summer! 🌞",
    status: "scheduled"
  }
];

type ChipColor = "danger" | "primary" | "secondary" | "success" | "default" | "warning";

export default function CalendarPage() {
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [view, setView] = useState("week");
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    channel: "",
    campaign: "",
    date: "",
    time: "",
    content: ""
  });

  const filteredEvents = events.filter(event => {
    const channelMatch = selectedChannel === "all" || event.channel === selectedChannel;
    const campaignMatch = selectedCampaign === "all" || event.campaign === selectedCampaign;
    return channelMatch && campaignMatch;
  });

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      channel: "",
      campaign: "",
      date: "",
      time: "",
      content: ""
    });
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      channel: event.channel,
      campaign: event.campaign,
      date: event.date,
      time: event.time,
      content: event.content
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      setEvents(events.map(event => 
        event.id === editingEvent.id 
          ? { ...event, ...formData }
          : event
      ));
    } else {
      setEvents([
        ...events,
        {
          id: events.length + 1,
          ...formData,
          status: "scheduled"
        }
      ]);
    }
    setIsModalOpen(false);
  };

  const getChannelColor = (channel: string): ChipColor => {
    switch (channel) {
      case "twitter": return "danger";
      case "bluesky": return "primary";
      case "facebook": return "secondary";
      case "email": return "success";
      default: return "default";
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Content Calendar</h1>
        <Button
          color="primary"
          startContent={<PlusIcon className="w-5 h-5" />}
          onPress={handleAddEvent}
        >
          Add Content
        </Button>
      </div>

      {/* Filters and View Options */}
      <Card className="mb-8">
        <CardBody className="flex flex-wrap gap-4 items-center">
          <Select
            label="Channel"
            className="w-48"
            selectedKeys={[selectedChannel]}
            onChange={(e) => setSelectedChannel(e.target.value)}
          >
            {channels.map(channel => (
              <SelectItem key={channel.id} textValue={channel.name}>
                {channel.name}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Campaign"
            className="w-48"
            selectedKeys={[selectedCampaign]}
            onChange={(e) => setSelectedCampaign(e.target.value)}
          >
            {campaigns.map(campaign => (
              <SelectItem key={campaign.id} textValue={campaign.name}>
                {campaign.name}
              </SelectItem>
            ))}
          </Select>

          <div className="flex gap-2 ml-auto">
            <Button
              isIconOnly
              variant={view === "week" ? "solid" : "flat"}
              onPress={() => setView("week")}
            >
              <CalendarDaysIcon className="w-5 h-5" />
            </Button>
            <Button
              isIconOnly
              variant={view === "list" ? "solid" : "flat"}
              onPress={() => setView("list")}
            >
              <Bars3Icon className="w-5 h-5" />
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Calendar View */}
      {view === "week" ? (
        <div className="grid grid-cols-7 gap-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
            <Card key={day}>
              <CardHeader className="text-center font-semibold">
                {day}
              </CardHeader>
              <CardBody className="min-h-[400px]">
                {filteredEvents
                  .filter(event => new Date(event.date).getDay() === ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day))
                  .map(event => (
                    <div
                      key={event.id}
                      className="p-2 mb-2 rounded-lg bg-content2"
                    >
                      <div className="flex items-center justify-between">
                        <Chip
                          size="sm"
                          color={getChannelColor(event.channel)}
                          variant="flat"
                        >
                          {event.channel}
                        </Chip>
                        <div className="flex gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            onPress={() => handleEditEvent(event)}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => handleDeleteEvent(event.id)}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm font-medium mt-1">{event.title}</p>
                      <p className="text-xs text-foreground/60">{event.time}</p>
                    </div>
                  ))}
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardBody>
            <div className="space-y-4">
              {filteredEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-content2 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-sm font-medium">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      <p className="text-2xl font-bold">{new Date(event.date).getDate()}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Chip
                          size="sm"
                          color={getChannelColor(event.channel)}
                          variant="flat"
                        >
                          {event.channel}
                        </Chip>
                        <p className="font-medium">{event.title}</p>
                      </div>
                      <p className="text-sm text-foreground/60">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => handleEditEvent(event)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      color="danger"
                      onPress={() => handleDeleteEvent(event.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent>
          <ModalHeader>
            {editingEvent ? "Edit Content" : "Add New Content"}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Select
                label="Channel"
                selectedKeys={[formData.channel]}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
              >
                {channels.filter(c => c.id !== "all").map(channel => (
                  <SelectItem key={channel.id} textValue={channel.name}>
                    {channel.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Campaign"
                selectedKeys={[formData.campaign]}
                onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
              >
                {campaigns.filter(c => c.id !== "all").map(campaign => (
                  <SelectItem key={campaign.id} textValue={campaign.name}>
                    {campaign.name}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex gap-4">
                <Input
                  type="date"
                  label="Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <Input
                  type="time"
                  label="Time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
              <Textarea
                label="Content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSaveEvent}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 