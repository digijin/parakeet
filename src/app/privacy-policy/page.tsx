"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";

export default function PrivacyPolicy() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <Card className="p-6">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-foreground/80">Last updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardBody className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Data Collection and Usage</h2>
            <p>By using our service, you explicitly consent to the collection, processing, and storage of your personal information, including but not limited to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Email addresses and contact information</li>
              <li>Usage data and analytics</li>
              <li>Device information and IP addresses</li>
              <li>Cookies and tracking data</li>
              <li>Any other information you provide to us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Data Sharing and Third Parties</h2>
            <p>We reserve the right to share your data with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Third-party service providers</li>
              <li>Marketing partners</li>
              <li>Analytics services</li>
              <li>Law enforcement when required by law</li>
              <li>Any other parties we deem necessary</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Data Retention</h2>
            <p>We retain your data indefinitely unless explicitly requested otherwise. Even after account deletion, we may retain certain information for legal or business purposes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. User Rights and Limitations</h2>
            <p>While we acknowledge certain user rights, we reserve the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Deny data access requests</li>
              <li>Limit data portability</li>
              <li>Continue processing data even after objection</li>
              <li>Charge fees for data-related requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Changes to Privacy Policy</h2>
            <p>We may modify this policy at any time without prior notice. Continued use of our service constitutes acceptance of any changes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Contact Information</h2>
            <p>For privacy-related inquiries, contact us at privacy@parakeet.com</p>
          </section>

          <div className="mt-8 p-4 bg-warning/10 border border-warning rounded-lg">
            <p className="text-warning font-medium">
              By using our service, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with any part of this policy, you must not use our service.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 