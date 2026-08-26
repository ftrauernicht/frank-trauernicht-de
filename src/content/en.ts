import type { Content } from './types';

export const en: Content = {
  lang: 'en',
  htmlLang: 'en',
  otherLang: { code: 'de', href: '/', label: 'Deutsch', aria: 'Zur deutschen Fassung wechseln' },

  meta: {
    title: 'Frank Trauernicht — Senior Software Engineer',
    description:
      'Senior software engineer based in East Frisia, northern Germany. C# and .NET since 2011, architecture and modernisation of long-lived systems, operations in regulated environments too. Seven years of leadership from running my own software company.',
    ogAlt: 'Portrait of Frank Trauernicht',
  },

  skipLink: 'Skip to content',

  hero: {
    name: 'Frank Trauernicht',
    role: 'Senior Software Engineer',
    facts: ['C# and .NET since 2011', 'East Frisia, Germany — remote'],
    lead: [
      'I have been building software in C# and .NET for fifteen years. Mostly where something is already running and is meant to keep running: long-lived systems, large volumes of data, environments with constraints.',
    ],
    photoAlt: 'Frank Trauernicht',
  },

  sections: [
    {
      id: 'how-i-work',
      heading: 'How I work',
      paragraphs: [
        'I know reasonably well what I am good at. I have found it more useful to know precisely where I am not — and who is better at it than I am. What I lack, I learn on the thing itself. Where someone else is faster, I bring them in rather than prove a point to myself.',
        'Working well together is not a side concern for me. Open criticism is part of it, in both directions — I take it gladly, and I think it is the shortest path to a better solution.',
      ],
    },
    {
      id: 'work',
      heading: 'The domain changes, the problems repeat',
      paragraphs: [
        'Fifteen years took me through very different industries. What changes is the subject matter. What repeats are the problems: large volumes of data that have to be processed reliably. Long-lived systems that are meant to keep living. Planning and scheduling. And, almost always, an interface that is documented nowhere.',
      ],
      listIntro: 'Some of it, without names:',
      list: [
        'Processing millions of vessel position reports per day — reconstructing routes, detecting movement patterns.',
        'Incident reporting for events on board, from capture through to the delivered report.',
        'A document management system.',
        'An insurance line-of-business system handling case files and cost overviews.',
        'Product catalogues with millions of records and a consistent rollout of bookable items.',
        'Maintenance planning for wind turbines, including route planning and remote access to the installations.',
        'Event management with ticket sales through Stripe and seat booking on a three-dimensional venue plan.',
      ],
      afterList: [
        'The maritime corner was a good time, and AIS data at that scale is a pleasant problem to have. It is part of my history — it is not its foundation.',
      ],
    },
    {
      id: 'architecture',
      heading: 'Architecture',
      paragraphs: [
        'Monolith, modular monolith, microservices, and everything improvised in between: these structures exist, and you rarely get to choose which one is in front of you. The work is being able to handle whichever it turns out to be — the one you designed as much as the one you inherited.',
        'Before the decision comes the reading. What a system does today is rarely written where it is documented; it is in the code, in the data, and in the habits of the people who work with it. Only after that can you say what can stay and what has to be replaced.',
      ],
    },
    {
      id: 'responsibility',
      heading: 'What seven years of running a company left me with',
      paragraphs: [
        'For seven years I ran a software company I co-founded, latterly with a team of twelve. My half of it was the technical one and, above all, the human one: finding the ideas worth pursuing, turning them into plans that hold, building alongside the team, and keeping things structured enough that people could work without waiting on me.',
        'It changed how I engineer. When you are still there three years later maintaining what you decided, architecture stops being a matter of taste.',
        'The planning half came with me: estimates that hold. Scope that can be cut without collapsing. And the habit of reading the numbers — a technical decision is a cost structure, and I can make that case to the people who sign for it.',
      ],
    },
    {
      id: 'operations',
      heading: 'Running systems',
      paragraphs: [
        'Some of what I build runs in the cloud, some on customer infrastructure — regulated industries, on-premises networks, environments where the data is not allowed to leave the building. The second teaches you what the first hides: nothing there quietly handles backups, certificates, monitoring, or failover for you.',
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      paragraphs: [
        'I am not a penetration tester and I do not present myself as one. I work with the OWASP lists, run scans, read up on whatever I am about to examine, and most recently looked at a mobile application in a regulated setting.',
        'What I bring is the habit of asking, at design time, where this is going to break — rather than at the audit.',
      ],
    },
    {
      id: 'ai',
      heading: 'Working with AI',
      paragraphs: [
        'AI is a powerful tool and I use it daily. What it does not take off your hands is responsibility. The code that ships is mine; I have to be able to explain it and stand behind it.',
        'Anything that cannot be verified is not saved effort — it is an invoice arriving later.',
      ],
    },
    {
      id: 'teaching',
      heading: 'Learning and passing it on',
      paragraphs: [
        'After my Abitur — the German university-entrance qualification — I deliberately chose a three-year apprenticeship over a degree. I wanted to be able to do things rather than hear about them for years, and little has changed: what I need, I learn on the thing itself.',
        'I have trained apprentices almost continuously ever since: more than twelve of them over the years, several finishing top of their year and honoured at the graduation ceremony in Leer. Of everything I have done professionally, that is the part with the longest half-life.',
        'It goes back out where it fits. A fork of exam material for the German software developer qualification has grown into a body of material of my own: chapters, diagrams, exam questions and cheat sheets, in German and English. Alongside it, a project-based JavaScript course for people who are just starting.',
      ],
    },
  ],

  career: {
    heading: 'Career',
    stations: [
      {
        period: 'since July 2026',
        role: 'Senior Software Engineer',
        note: 'Employed.',
      },
      {
        period: '2019 – 2026',
        role: 'Co-founder and managing director, latterly senior engineer',
        org: 'Leanetec GmbH',
        note: 'Technical direction, steering of projects, and a team of twelve.',
      },
      {
        period: '2011 – 2019',
        role: 'Apprenticeship, engineer, latterly head of software development',
        org: 'BUSS DATA GmbH',
        note: 'Apprenticeship as an application developer, then engineering and responsibility for the development team.',
      },
    ],
  },

  repos: {
    heading: 'Public work',
    intro: [
      'Most of what I build lives in private and customer repositories. What is public is what stands on its own.',
    ],
    items: [
      {
        name: 'fachinformatiker-anwendungsentwicklung',
        url: 'https://github.com/ftrauernicht/fachinformatiker-anwendungsentwicklung',
        text: 'Study material for the final examination of the German application developer qualification — chapters, diagrams, exam questions and cheat sheets, in German and English. Grown from a fork into a body of material of its own.',
      },
      {
        name: 'dotnet-architecture-hexagonal-template',
        url: 'https://github.com/ftrauernicht/dotnet-architecture-hexagonal-template',
        text: 'A starting point for .NET projects with cleanly separated layers, fixed dependency directions and tests that run.',
      },
      {
        name: 'javascript-course',
        url: 'https://github.com/ftrauernicht/javascript-course',
        text: 'A project-based JavaScript course for beginners, from the first script to small applications.',
      },
      {
        name: 'raspi-google-drive-sync',
        url: 'https://github.com/ftrauernicht/raspi-google-drive-sync',
        text: 'Backups to Google Drive on a first-generation Raspberry Pi — 512 MB of memory, ARMv6, and the job of recovering by itself when something goes wrong.',
      },
      {
        name: 'ha-automation-cookbook',
        url: 'https://github.com/ftrauernicht/ha-automation-cookbook',
        text: 'Copy-pasteable automation patterns for Home Assistant, with sun-aware blind control and time-in-zone statistics in two further repositories.',
      },
    ],
  },

  contact: {
    heading: 'Away from the desk',
    paragraphs: [
      'Outside work I go geocaching, push my home automation further than anyone asked for, and design and print in 3D. No figurines — brackets, replacement parts, things that solve an actual problem. Building something, repairing something, making something useful: the same drive as at work, only without a ticket system.',
      'I live and work in East Frisia in northern Germany. German and English at work, and Low German whenever someone starts it.',
    ],
    emailIntro: 'Reachable at',
    email: 'mail@frank-trauernicht.de',
    profiles: [
      { label: 'GitHub', url: 'https://github.com/ftrauernicht' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/frank-trauernicht/' },
      { label: 'XING', url: 'https://www.xing.com/profile/Frank_Trauernicht' },
    ],
  },

  footer: {
    imprint: { label: 'Legal notice', href: '/en/imprint/' },
    privacy: { label: 'Privacy', href: '/en/privacy/' },
    note: 'This site sets no cookies, loads nothing from third-party servers, and measures no behaviour.',
  },

  legal: { backHome: 'Back to the homepage' },
};
