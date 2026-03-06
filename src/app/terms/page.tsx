import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: `Terms of Service | ${SITE.name}`,
  description: `Terms and conditions for using ${SITE.name} website and services.`,
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20">
      <div className="container-wide max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          Terms of Service
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12">
          Last updated: March 6, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          {/* 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              By accessing and using {SITE.name} website and services, you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              2. Use of Services
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
              Our services are provided for the purpose of supporting the mission and community of {SITE.name}. You agree to use the services only for lawful purposes and in accordance with these terms. You must not:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-300 space-y-2">
              <li>Use the services in any way that violates applicable laws or regulations.</li>
              <li>Attempt to gain unauthorised access to any part of the services.</li>
              <li>Transmit any harmful, threatening, abusive, or otherwise objectionable content.</li>
              <li>Interfere with or disrupt the integrity or performance of the services.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              3. User Accounts
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              When you create an account with us, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
              You agree to provide accurate, current, and complete information during the registration process and to update such information as necessary.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              4. Donations &amp; Purchases
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              All donations made through our platform are voluntary and non-refundable unless otherwise stated.
              Purchases from our store are subject to our refund and return policies.
              We use third-party payment processors (Stripe, Paystack, PayPal) to handle transactions securely.
              We do not store your full payment card details on our servers.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              5. Intellectual Property
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              All content on this website — including text, graphics, logos, images, audio, video, and software — is the property of {SITE.name} or its content suppliers and is protected by applicable intellectual property laws.
              You may not reproduce, distribute, or create derivative works from our content without prior written permission.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              6. Community Guidelines
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              As a faith-based community, we expect all members to conduct themselves with integrity, respect, and love.
              Content or behaviour that is hateful, discriminatory, or contrary to the values of {SITE.name} may result in account suspension or termination.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              {SITE.name} and its team shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of, or inability to use, our services.
              We provide the services on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page.
              Your continued use of the services after changes are posted constitutes your acceptance of the revised terms.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              9. Contact Us
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              If you have any questions about these Terms of Service, please{" "}
              <Link href="/contact" className="text-amber-500 hover:text-amber-400 underline underline-offset-4">
                contact us
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
