import React from 'react';
import { ScrollText } from 'lucide-react';
import LegalDocument from '../components/LegalDocument';
import { termsDocuments } from '../content/termsContent';

export const Terms: React.FC = () => (
  <LegalDocument documents={termsDocuments} Icon={ScrollText} />
);

export default Terms;
