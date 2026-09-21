import React from 'react';
import { ShieldCheck } from 'lucide-react';
import LegalDocument from '../components/LegalDocument';
import { privacyDocuments } from '../content/privacyContent';

export const Privacy: React.FC = () => (
  <LegalDocument documents={privacyDocuments} Icon={ShieldCheck} />
);

export default Privacy;
