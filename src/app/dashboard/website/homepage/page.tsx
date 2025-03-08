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
  ModalFooter
} from "@heroui/react";
import { 
  PhoneIcon,
  MapPinIcon,
  ShareIcon,
  CalendarIcon,
  EnvelopeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isVisible: boolean;
}

interface ContactField {
  id: string;
  label: string;
  type: string;
  isRequired: boolean;
  isVisible: boolean;
}

interface BookingField {
  id: string;
  label: string;
  type: string;
  isRequired: boolean;
  isVisible: boolean;
}

const mockSocialLinks: SocialLink[] = [
  {
    id: "twitter",
    platform: "Twitter",
    url: "https://twitter.com/example",
    isVisible: true
  },
  {
    id: "facebook",
    platform: "Facebook",
    url: "https://facebook.com/example",
    isVisible: true
  },
  {
    id: "instagram",
    platform: "Instagram",
    url: "https://instagram.com/example",
    isVisible: true
  }
];

const mockContactFields: ContactField[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    isRequired: true,
    isVisible: true
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    isRequired: true,
    isVisible: true
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    isRequired: false,
    isVisible: true
  },
  {
    id: "message",
    label: "Message",
    type: "textarea",
    isRequired: true,
    isVisible: true
  }
];

const mockBookingFields: BookingField[] = [
  {
    id: "name",
    label: "Name",
    type: "text",
    isRequired: true,
    isVisible: true
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    isRequired: true,
    isVisible: true
  },
  {
    id: "phone",
    label: "Phone",
    type: "tel",
    isRequired: true,
    isVisible: true
  },
  {
    id: "date",
    label: "Preferred Date",
    type: "date",
    isRequired: true,
    isVisible: true
  },
  {
    id: "time",
    label: "Preferred Time",
    type: "time",
    isRequired: true,
    isVisible: true
  },
  {
    id: "notes",
    label: "Additional Notes",
    type: "textarea",
    isRequired: false,
    isVisible: true
  }
];

export default function HomepageSettingsPage() {
  const [phoneNumber, setPhoneNumber] = useState("+1 (555) 123-4567");
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "" });
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [newField, setNewField] = useState({ label: "", type: "text", isRequired: false });
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(mockSocialLinks);
  const [contactFields, setContactFields] = useState<ContactField[]>(mockContactFields);
  const [bookingFields, setBookingFields] = useState<BookingField[]>(mockBookingFields);
  const [gbpPlaceId, setGbpPlaceId] = useState("");

  const handleAddSocialLink = () => {
    setNewSocialLink({ platform: "", url: "" });
    setIsSocialModalOpen(true);
  };

  const handleSaveSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setSocialLinks([
        ...socialLinks,
        {
          id: newSocialLink.platform.toLowerCase(),
          platform: newSocialLink.platform,
          url: newSocialLink.url,
          isVisible: true
        }
      ]);
      setIsSocialModalOpen(false);
    }
  };

  const handleDeleteSocialLink = (linkId: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== linkId));
  };

  const handleToggleSocialLink = (linkId: string) => {
    setSocialLinks(socialLinks.map(link => 
      link.id === linkId 
        ? { ...link, isVisible: !link.isVisible }
        : link
    ));
  };

  const handleAddField = (type: "contact" | "booking") => {
    setNewField({ label: "", type: "text", isRequired: false });
    setIsFieldModalOpen(true);
  };

  const handleSaveField = (type: "contact" | "booking") => {
    if (newField.label) {
      const field = {
        id: newField.label.toLowerCase().replace(/\s+/g, "-"),
        label: newField.label,
        type: newField.type,
        isRequired: newField.isRequired,
        isVisible: true
      };

      if (type === "contact") {
        setContactFields([...contactFields, field]);
      } else {
        setBookingFields([...bookingFields, field]);
      }
      setIsFieldModalOpen(false);
    }
  };

  const handleDeleteField = (fieldId: string, type: "contact" | "booking") => {
    if (type === "contact") {
      setContactFields(contactFields.filter(field => field.id !== fieldId));
    } else {
      setBookingFields(bookingFields.filter(field => field.id !== fieldId));
    }
  };

  const handleToggleField = (fieldId: string, type: "contact" | "booking") => {
    if (type === "contact") {
      setContactFields(contactFields.map(field => 
        field.id === fieldId 
          ? { ...field, isVisible: !field.isVisible }
          : field
      ));
    } else {
      setBookingFields(bookingFields.map(field => 
        field.id === fieldId 
          ? { ...field, isVisible: !field.isVisible }
          : field
      ));
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Homepage Settings</h1>

      {/* Phone Number Settings */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Phone Number</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            onPress={() => setIsPhoneModalOpen(true)}
          >
            Change Number
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60">Display Number</p>
                <p className="text-lg font-medium">{phoneNumber}</p>
              </div>
              <Switch defaultSelected />
            </div>
            <div className="bg-content2 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Tracking Settings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Track "Call Now" button clicks</span>
                  <Switch defaultSelected />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Track number reveals</span>
                  <Switch defaultSelected />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Contact Form Settings */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Contact Form</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            startContent={<PlusIcon className="w-5 h-5" />}
            onPress={() => handleAddField("contact")}
          >
            Add Field
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {contactFields.map(field => (
              <div
                key={field.id}
                className="flex items-center justify-between p-4 bg-content2 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{field.label}</p>
                      {field.isRequired && (
                        <Chip size="sm" color="primary" variant="flat">
                          Required
                        </Chip>
                      )}
                    </div>
                    <p className="text-sm text-foreground/60">{field.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    isSelected={field.isVisible}
                    onValueChange={() => handleToggleField(field.id, "contact")}
                  />
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={() => handleDeleteField(field.id, "contact")}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Booking Form Settings */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Booking Form</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            startContent={<PlusIcon className="w-5 h-5" />}
            onPress={() => handleAddField("booking")}
          >
            Add Field
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {bookingFields.map(field => (
              <div
                key={field.id}
                className="flex items-center justify-between p-4 bg-content2 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{field.label}</p>
                      {field.isRequired && (
                        <Chip size="sm" color="primary" variant="flat">
                          Required
                        </Chip>
                      )}
                    </div>
                    <p className="text-sm text-foreground/60">{field.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    isSelected={field.isVisible}
                    onValueChange={() => handleToggleField(field.id, "booking")}
                  />
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={() => handleDeleteField(field.id, "booking")}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Social Links */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <ShareIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Social Links</h2>
          </div>
          <Button
            color="primary"
            variant="flat"
            startContent={<PlusIcon className="w-5 h-5" />}
            onPress={handleAddSocialLink}
          >
            Add Link
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {socialLinks.map(link => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 bg-content2 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">{link.platform}</p>
                    <p className="text-sm text-foreground/60">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    isSelected={link.isVisible}
                    onValueChange={() => handleToggleSocialLink(link.id)}
                  />
                  <Button
                    isIconOnly
                    variant="light"
                    color="danger"
                    onPress={() => handleDeleteSocialLink(link.id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Google Business Profile */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <MapPinIcon className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Google Business Profile</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <Input
              label="Place ID"
              placeholder="Enter your Google Business Profile Place ID"
              value={gbpPlaceId}
              onChange={(e) => setGbpPlaceId(e.target.value)}
            />
            <p className="text-sm text-foreground/60">
              Find your Place ID by searching for your business on Google Maps and copying the ID from the URL.
            </p>
            <Button color="primary" variant="flat">
              Connect Profile
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Phone Number Modal */}
      <Modal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Change Phone Number</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="New Phone Number"
                placeholder="Enter phone number"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsPhoneModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => {
              setPhoneNumber(newPhoneNumber);
              setIsPhoneModalOpen(false);
            }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Social Link Modal */}
      <Modal isOpen={isSocialModalOpen} onClose={() => setIsSocialModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Add Social Link</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Platform"
                placeholder="e.g., Twitter, Facebook"
                value={newSocialLink.platform}
                onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
              />
              <Input
                label="URL"
                placeholder="https://"
                value={newSocialLink.url}
                onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsSocialModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSaveSocialLink}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Field Modal */}
      <Modal isOpen={isFieldModalOpen} onClose={() => setIsFieldModalOpen(false)}>
        <ModalContent>
          <ModalHeader>Add Form Field</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Field Label"
                placeholder="Enter field label"
                value={newField.label}
                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              />
              <Select
                label="Field Type"
                selectedKeys={[newField.type]}
                onChange={(e) => setNewField({ ...newField, type: e.target.value })}
              >
                <SelectItem key="text" textValue="Text">
                  Text
                </SelectItem>
                <SelectItem key="email" textValue="Email">
                  Email
                </SelectItem>
                <SelectItem key="tel" textValue="Phone">
                  Phone
                </SelectItem>
                <SelectItem key="textarea" textValue="Text Area">
                  Text Area
                </SelectItem>
                <SelectItem key="date" textValue="Date">
                  Date
                </SelectItem>
                <SelectItem key="time" textValue="Time">
                  Time
                </SelectItem>
              </Select>
              <div className="flex items-center justify-between">
                <span className="text-sm">Required Field</span>
                <Switch
                  isSelected={newField.isRequired}
                  onValueChange={(checked) => setNewField({ ...newField, isRequired: checked })}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsFieldModalOpen(false)}>
              Cancel
            </Button>
            <Button color="primary" onPress={() => handleSaveField("contact")}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
} 