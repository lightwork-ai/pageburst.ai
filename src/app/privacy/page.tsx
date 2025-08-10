export default function PrivacyPage() {
  return (
    <div className="container-page space-y-6">
      <h1 className="text-3xl font-bold">Privacy Notice</h1>
      <p className="text-foreground/75 max-w-prose">
        We process personal data in accordance with UK GDPR and the Data Protection Act 2018.
        We collect only what we need to operate the service, retain it only as long as necessary,
        and never sell your data.
      </p>
      <div className="card-glass p-6 space-y-3">
        <h2 className="font-semibold">Your rights</h2>
        <ul className="list-disc pl-5 text-foreground/75 space-y-1">
          <li>Access, rectify, or erase your data</li>
          <li>Object to or restrict processing</li>
          <li>Data portability</li>
        </ul>
        <p className="text-sm text-foreground/60">
          Contact us to exercise your rights or for any privacy questions.
        </p>
      </div>
    </div>
  );
}


