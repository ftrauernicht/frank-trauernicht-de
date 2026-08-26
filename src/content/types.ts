export interface Section {
  id: string;
  heading: string;
  paragraphs: string[];
  listIntro?: string;
  list?: string[];
  afterList?: string[];
}

export interface Station {
  period: string;
  role: string;
  org?: string;
  note?: string;
}

export interface RepoLink {
  name: string;
  url: string;
  text: string;
}

export interface Content {
  lang: 'de' | 'en';
  htmlLang: string;
  otherLang: { code: 'de' | 'en'; href: string; label: string; aria: string };
  meta: { title: string; description: string; ogAlt: string };
  skipLink: string;
  hero: { name: string; role: string; facts: string[]; lead: string[]; photoAlt: string };
  sections: Section[];
  career: { heading: string; stations: Station[] };
  repos: { heading: string; intro: string[]; items: RepoLink[] };
  contact: {
    heading: string;
    paragraphs: string[];
    emailIntro: string;
    email: string;
    profiles: { label: string; url: string }[];
  };
  footer: {
    imprint: { label: string; href: string };
    privacy: { label: string; href: string };
    note: string;
  };
  legal: { backHome: string };
}
