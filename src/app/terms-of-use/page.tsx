"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";

export default function TermsOfUse() {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <Card className="p-6">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
          <p className="text-foreground/80">Last updated: {new Date().toLocaleDateString()}</p>
        </CardHeader>
        <CardBody className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
            <p>By accessing or using our service, you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you must not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. Service Description</h2>
            <p>Our service is provided "as is" and "as available" without any warranties, either express or implied. We reserve the right to modify, suspend, or discontinue any part of the service at any time.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
            <p>Users must:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of their account</li>
              <li>Not use the service for any illegal purposes</li>
              <li>Not attempt to reverse engineer the service</li>
              <li>Not interfere with the service's operation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Intellectual Property</h2>
            <p>All content, features, and functionality of our service are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Limitation of Liability</h2>
            <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">6. Termination</h2>
            <p>We reserve the right to terminate or suspend your account and access to our service at our sole discretion, without prior notice or liability.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">7. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of the service after such modifications constitutes acceptance of the updated terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of our jurisdiction, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Contact Information</h2>
            <p>For questions about these Terms of Use, contact us at legal@parakeet.com</p>
          </section>

          <div className="mt-8 p-4 bg-warning/10 border border-warning rounded-lg">
            <p className="text-warning font-medium">
              By using our service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you must not use our service.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 