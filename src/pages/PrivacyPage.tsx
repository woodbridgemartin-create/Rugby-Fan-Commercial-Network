export default function PrivacyPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
          <p className="text-gray-400 text-xs">Last updated: May 2026</p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">1. Introduction</h2>
          <p>
            Leadsopedia Limited (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the Rugby Fan platform. This Privacy Policy explains how we collect, use, and protect your personal information when you use our service.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Personal identification information (name, email address, phone number)</li>
            <li>Business or club information you provide when registering</li>
            <li>Usage data and analytics about how you interact with our platform</li>
            <li>Communication data from contact forms and enquiries</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-8">3. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide and maintain our service</li>
            <li>Process your membership and directory listings</li>
            <li>Communicate with you about your account and our services</li>
            <li>Improve our platform and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-8">4. Data Protection</h2>
          <p>
            We comply with UK GDPR and the Data Protection Act 2018. Your data is stored securely and only processed in accordance with this policy. We will not sell your personal data to third parties.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-8">6. Contact</h2>
          <p>
            For any privacy-related queries, please contact us at{' '}
            <a href="mailto:hello@rugbyfan.co.uk" className="text-[#002366] hover:underline">hello@rugbyfan.co.uk</a>.
          </p>

          <p className="text-gray-400 text-xs pt-8">
            This is a placeholder privacy policy. A full version will be published before launch.
          </p>
        </div>
      </div>
    </div>
  );
}
