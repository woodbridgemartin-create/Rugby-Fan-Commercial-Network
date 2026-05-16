export default function TermsPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 text-sm leading-relaxed">
          <p className="text-gray-400 text-xs">Last updated: May 2026</p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Rugby Fan platform, operated by Leadsopedia Limited, you agree to be bound by these Terms of Service. If you do not agree, please do not use our service.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">2. Description of Service</h2>
          <p>
            Rugby Fan is a commercial network connecting rugby clubs with businesses. We provide directory listings, networking tools, and related services for the UK rugby community.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">3. Membership</h2>
          <p>
            Club membership is free. Business membership is available on an annual basis. Founding Members receive a locked-in rate of &pound;79/year. Standard pricing is &pound;149/year. Membership fees are non-refundable except as required by law.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">4. User Responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate and up-to-date information for your listing</li>
            <li>Not misuse the platform or engage in fraudulent activity</li>
            <li>Respect other users and their data</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <h2 className="text-lg font-bold text-gray-900 mt-8">5. Intellectual Property</h2>
          <p>
            All content on the Rugby Fan platform, including logos, designs, and text, is the property of Leadsopedia Limited or its licensors. You may not reproduce or distribute our content without permission.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">6. Limitation of Liability</h2>
          <p>
            Rugby Fan is provided &quot;as is&quot; without warranties of any kind. Leadsopedia Limited shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">7. Termination</h2>
          <p>
            We may suspend or terminate your account if you breach these terms. You may cancel your membership at any time, though fees already paid are non-refundable.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">8. Governing Law</h2>
          <p>
            These terms are governed by the laws of England and Wales. Any disputes shall be resolved in the courts of England and Wales.
          </p>

          <h2 className="text-lg font-bold text-gray-900 mt-8">9. Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href="mailto:hello@rugbyfan.co.uk" className="text-[#002366] hover:underline">hello@rugbyfan.co.uk</a>.
          </p>

          <p className="text-gray-400 text-xs pt-8">
            This is a placeholder terms of service. A full version will be published before launch.
          </p>
        </div>
      </div>
    </div>
  );
}
