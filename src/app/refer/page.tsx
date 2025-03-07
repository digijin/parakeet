"use client";

import { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader,
  Input,
  Button,
  Divider,
  Textarea
} from "@heroui/react";

export default function ReferPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    referralEmail: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage({
        type: "success",
        text: "Thank you for your referral! We'll contact your friend shortly."
      });
      setFormData({ name: "", email: "", referralEmail: "", message: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "There was an error submitting your referral. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <Card className="p-6">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-4">Refer a Friend</h1>
          <p className="text-foreground/80">Share Parakeet with your network and earn rewards!</p>
        </CardHeader>
        <CardBody className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Referral Program Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-content2 rounded-lg">
                <h3 className="font-semibold mb-2">For You</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>3 months of premium features</li>
                  <li>Priority support access</li>
                  <li>Exclusive early access to new features</li>
                  <li>Recognition in our community</li>
                </ul>
              </div>
              <div className="p-4 bg-content2 rounded-lg">
                <h3 className="font-semibold mb-2">For Your Friend</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>2 weeks free trial</li>
                  <li>Special onboarding support</li>
                  <li>Exclusive welcome package</li>
                  <li>Priority feature requests</li>
                </ul>
              </div>
            </div>
          </section>

          <Divider />

          <section>
            <h2 className="text-xl font-semibold mb-4">Submit a Referral</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                isDisabled={isSubmitting}
              />
              <Input
                type="email"
                label="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                isDisabled={isSubmitting}
              />
              <Input
                type="email"
                label="Friend's Email"
                value={formData.referralEmail}
                onChange={(e) => setFormData({ ...formData, referralEmail: e.target.value })}
                required
                isDisabled={isSubmitting}
              />
              <Textarea
                label="Personal Message (Optional)"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Add a personal message to your friend..."
                isDisabled={isSubmitting}
              />
              {message && (
                <div className={`p-4 rounded-lg ${
                  message.type === "success" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
                }`}>
                  {message.text}
                </div>
              )}
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Referral"}
              </Button>
            </form>
          </section>

          <Divider />

          <section>
            <h2 className="text-xl font-semibold mb-4">Program Rules</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Each referral must be unique and not previously referred</li>
              <li>Your friend must sign up within 30 days of referral</li>
              <li>Rewards are subject to verification and approval</li>
              <li>Program terms may be modified at any time</li>
              <li>One referral per email address</li>
              <li>Rewards are non-transferable and cannot be combined</li>
            </ul>
          </section>
        </CardBody>
      </Card>
    </div>
  );
} 