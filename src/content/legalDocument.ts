// Shape shared by the legal notices (privacy policy, terms of service). The
// pages differ only in their text, so they hand the same structure to
// components/LegalDocument.tsx and it does the drawing.

export type LegalLanguage = 'ko' | 'en';

export interface LegalTable {
  head: string[];
  rows: string[][];
}

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: LegalTable;
  // Trailing prose, rendered after the bullets and the table. A legal basis or
  // a caveat belongs under the list it qualifies, not above it.
  notes?: string[];
}

export interface LegalDocumentContent {
  title: string;
  effectiveLabel: string;
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
}

export const legalLanguageLabels: Record<LegalLanguage, string> = {
  ko: '한국어',
  en: 'English',
};

// One address answers both notices, so neither file gets its own copy to drift.
export const legalContact = 'me@yunseong.dev';
