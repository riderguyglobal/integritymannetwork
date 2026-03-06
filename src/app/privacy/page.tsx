import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: `Privacy Policy | ${SITE.name}`,
  description: `Privacy policy for ${SITE.name} — how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-20">
      <div className="container-wide max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          Privacy Policy
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12">
          Last updated: March 6, 2026
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
          {/* 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              1. Information We Collect
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
              We collect information you provide directly when you:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-300 space-y-2">
              <li>Create an account (name, email address, password).</li>
              <li>Join the network or register for events.</li>
              <li>Make a donation or purchase from our store.</li>
              <li>Contact us or submit enquiries through our forms.</li>
              <li>Subscribe to our newsletter.</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
              We may also automatically collect certain technical information such as your IP address, browser type, device information, and pages visited to improve our services.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-300 space-y-2">
              <li>To provide, maintain, and improve our services.</li>
              <li>To process donations and store purchases.</li>
              <li>To send you updates about events, community activities, and ministry news.</li>
              <li>To respond to your enquiries and provide support.</li>
              <li>To ensure the security and integrity of our platform.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              3. Information Sharing
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-300 space-y-2 mt-3">
              <li><strong>Payment processors:</strong> Stripe, Paystack, and PayPal process your financial transactions securely. We do not store full payment card details.</li>
              <li><strong>Authentication providers:</strong> If you sign in with Google, we receive basic profile information (name, email, profile photo) from Google.</li>
              <li><strong>Legal requirements:</strong> We may disclose information if required by law or in response to valid legal processes.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              4. Data Security
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction.
              Passwords are securely hashed and never stored in plain text. All data is transmitted over encrypted connections (HTTPS).
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              5. Cookies
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              We use essential cookies to maintain your session and preferences. We do not use advertising or tracking cookies.
              By using our website, you consent to the use of essential cookies necessary for the functioning of our services.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              6. Your Rights
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-zinc-600 dark:text-zinc-300 space-y-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of your account and associated data.</li>
              <li>Withdraw consent for non-essential communications at any time.</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mt-3">
              To exercise any of these rights, please{" "}
              <Link href="/contact" className="text-amber-500 hover:text-amber-400 underline underline-offset-4">
                contact us
              </Link>.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              7. Children&apos;s Privacy
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Our services are not directed at individuals under the age of 13. We do not knowingly collect personal information from children.
              If you believe a child has provided us with personal information, please contact us and we will take steps to remove such data.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
              We encourage you to review this policy periodically.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
              9. Contact Us
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please{" "}
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
