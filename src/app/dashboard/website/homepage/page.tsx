"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Switch,
  Textarea,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Chip,
} from "@heroui/react";
import {
  PhoneIcon,
  MapPinIcon,
  LinkIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  active: boolean;
}

interface ContactField {
  id: number;
  label: string;
  type: string;
  required: boolean;
}

const mockSocialLinks: SocialLink[] = [
  { id: 1, platform: "facebook", url: "https://facebook.com/mybusiness", active: true },
  { id: 2, platform: "instagram", url: "https://instagram.com/mybusiness", active: true },
  { id: 3, platform: "twitter", url: "https://twitter.com/mybusiness", active: false },
];

const mockContactFields: ContactField[] = [
  { id: 1, label: "Name", type: "text", required: true },
  { id: 2, label: "Email", type: "email", required: true },
  { id: 3, label: "Phone", type: "tel", required: false },
  { id: 4, label: "Message", type: "textarea", required: true },
];

export default function HomepageSettingsPage() {
  const [activeTab, setActiveTab] = useState("contact");
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [trackCalls, setTrackCalls] = useState(true);
  const [placeId, setPlaceId] = useState("ChIJN1t_tDeuEmsRUsoyG83frY4");
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(mockSocialLinks);
  const [contactFields, setContactFields] = useState<ContactField[]>(mockContactFields);
  const [newField, setNewField] = useState({ label: "", type: "text", required: true });

  const handleSocialLinkToggle = (id: number) => {
    setSocialLinks(links =>
      links.map(link =>
        link.id === id ? { ...link, active: !link.active } : link
      )
    );
  };

  const handleAddContactField = () => {
    if (newField.label) {
      setContactFields(fields => [
        ...fields,
        { ...newField, id: Math.max(...fields.map(f => f.id)) + 1 }
      ]);
      setNewField({ label: "", type: "text", required: true });
    }
  };

  const handleRemoveContactField = (id: number) => {
    setContactFields(fields => fields.filter(field => field.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-6 h-6" />
            <div>
              <h1 className="text-2xl font-bold">Homepage Settings</h1>
              <p className="text-gray-500">Configure your homepage elements</p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key.toString())}>
            <Tab key="contact" title="Contact Form">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-4">Form Fields</h3>
                    <div className="space-y-4">
                      {contactFields.map((field) => (
                        <div key={field.id} className="flex items-center gap-4">
                          <Input
                            label="Field Label"
                            value={field.label}
                            className="flex-1"
                            readOnly
                          />
                          <Select
                            label="Type"
                            selectedKeys={[field.type]}
                            className="w-40"
                            isDisabled
                          >
                            <SelectItem key="text">Text</SelectItem>
                            <SelectItem key="email">Email</SelectItem>
                            <SelectItem key="tel">Phone</SelectItem>
                            <SelectItem key="textarea">Text Area</SelectItem>
                          </Select>
                          <Switch
                            isSelected={field.required}
                            isDisabled
                          />
                          <Button
                            isIconOnly
                            variant="light"
                            color="danger"
                            onPress={() => handleRemoveContactField(field.id)}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex items-end gap-4">
                        <Input
                          label="New Field Label"
                          value={newField.label}
                          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                          className="flex-1"
                        />
                        <Select
                          label="Type"
                          selectedKeys={[newField.type]}
                          className="w-40"
                          onChange={(value) => setNewField({ ...newField, type: value.target.value })}
                        >
                          <SelectItem key="text">Text</SelectItem>
                          <SelectItem key="email">Email</SelectItem>
                          <SelectItem key="tel">Phone</SelectItem>
                          <SelectItem key="textarea">Text Area</SelectItem>
                        </Select>
                        <Switch
                          isSelected={newField.required}
                          onValueChange={(value) => setNewField({ ...newField, required: value })}
                        />
                        <Button
                          isIconOnly
                          color="primary"
                          onPress={handleAddContactField}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="phone" title="Phone Settings">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-4">Phone Number</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <Input
                          label="Business Phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="light"
                          startContent={isPhoneVisible ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                          onPress={() => setIsPhoneVisible(!isPhoneVisible)}
                        >
                          {isPhoneVisible ? "Hide Number" : "Show Number"}
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          isSelected={trackCalls}
                          onValueChange={setTrackCalls}
                        />
                        <span>Track &quot;Call Now&quot; button clicks</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="social" title="Social Links">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
                    <div className="space-y-4">
                      {socialLinks.map((link) => (
                        <div key={link.id} className="flex items-center gap-4">
                          <Chip className="w-24">{link.platform}</Chip>
                          <Input
                            value={link.url}
                            className="flex-1"
                            startContent={<LinkIcon className="w-4 h-4" />}
                          />
                          <Switch
                            isSelected={link.active}
                            onValueChange={() => handleSocialLinkToggle(link.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            <Tab key="maps" title="Maps Integration">
              <div className="p-4 space-y-6">
                <Card className="bg-content2">
                  <CardBody>
                    <h3 className="text-lg font-semibold mb-4">Google Business Profile</h3>
                    <div className="space-y-4">
                      <Input
                        label="Place ID"
                        value={placeId}
                        onChange={(e) => setPlaceId(e.target.value)}
                        startContent={<MapPinIcon className="w-4 h-4" />}
                      />
                      <p className="text-sm text-gray-500">
                        Find your Place ID at{" "}
                        <a
                          href="https://developers.google.com/maps/documentation/places/web-service/place-id"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary"
                        >
                          Google Maps Platform
                        </a>
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
} 