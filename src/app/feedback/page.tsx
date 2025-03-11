"use client";

import { useState } from "react";
import { 
  Card, 
  CardBody, 
  CardHeader,
  Input,
  Button,
  Divider,
  Textarea,
  RadioGroup,
  Radio
} from "@heroui/react";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "feature",
    subject: "",
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
        text: "Thank you for your feedback! We'll review it and get back to you if needed."
      });
      setFormData({ name: "", email: "", type: "feature", subject: "", message: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "There was an error submitting your feedback. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <Card className="p-6">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-4">Feedback</h1>
          <p className="text-foreground/80">Help us improve Parakeet by sharing your thoughts</p>
        </CardHeader>
        <CardBody className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Feedback Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-content2 rounded-lg">
                <h3 className="font-semibold mb-2">What to Include</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Clear description of your feedback</li>
                  <li>Steps to reproduce (for bugs)</li>
                  <li>Expected vs actual behavior</li>
                  <li>Relevant screenshots or examples</li>
                  <li>Your use case or scenario</li>
                </ul>
              </div>
              <div className="p-4 bg-content2 rounded-lg">
                <h3 className="font-semibold mb-2">What to Avoid</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Vague or incomplete information</li>
                  <li>Personal attacks or inappropriate language</li>
                  <li>Multiple unrelated issues</li>
                  <li>Duplicate feedback</li>
                  <li>Confidential information</li>
                </ul>
              </div>
            </div>
          </section>

          <Divider />

          <section>
            <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
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
              <RadioGroup
                label="Feedback Type"
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                isDisabled={isSubmitting}
              >
                <Radio value="feature">Feature Request</Radio>
                <Radio value="bug">Bug Report</Radio>
                <Radio value="improvement">Improvement</Radio>
                <Radio value="other">Other</Radio>
              </RadioGroup>
              <Input
                label="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                isDisabled={isSubmitting}
              />
              <Textarea
                label="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Please provide detailed feedback..."
                required
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
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </form>
          </section>

          <Divider />

          <section>
            <h2 className="text-xl font-semibold mb-4">What Happens Next?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We review all feedback within 48 hours</li>
              <li>For bug reports, we&apos;ll prioritize based on severity</li>
              <li>Feature requests are evaluated for future releases</li>
              <li>We may contact you for additional information</li>
              <li>Status updates are provided via email</li>
            </ul>
          </section>
        </CardBody>
      </Card>
    </div>
  );
} 