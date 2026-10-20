export interface AcceptedItem {
  id: string;
  title: string;
  iconName: 'Laptop' | 'Smartphone' | 'Monitor' | 'Printer';
  description: string;
  examples: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: 'Wrench' | 'Laptop';
  subtitle: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const BUSINESS = {
  name: 'A+ Computers Olympia',
  shortName: 'A+ Computers',
  legalName: 'A+ Computers Olympia LLC',
  tagline: 'Free Local E-Recycling in Olympia',
  postcardHeadline: 'Received our postcard? Drop off your e-waste & electronics with us today!',
  dropOffBadge: 'Easy Drop-Off • Pull Up & Unload',
  dropOffBadgeLower: 'Easy Drop-Off • Pull up & unload',
  
  // Contact & Location details
  canonicalUrl: 'https://apluscomputerrecycle.com',
  streetAddress: '2724 Pacific Ave SE',
  addressLocality: 'Olympia',
  addressRegion: 'WA',
  postalCode: '98501',
  addressCountry: 'US',
  fullAddress: '2724 Pacific Ave SE, Olympia, WA 98501',
  shortAddress: '2724 Pacific Ave SE, Olympia, WA',
  
  // Navigation & Maps
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=2724+Pacific+Ave+SE+Olympia+WA+98501',
  googleMapsPlaceUrl:
    'https://www.google.com/maps/search/?api=1&query=2724+Pacific+Ave+SE+Olympia+WA+98501',
  geo: {
    latitude: 47.0384,
    longitude: -122.8631,
  },
  
  // Phone & Email
  phoneDisplay: '(360) 754-1311',
  phoneAltDisplay: '360-754-1311',
  phoneRaw: '+13607541311',
  phoneTel: 'tel:+13607541311',
  email: 'apluscomputersolympia@gmail.com',
  emailMailto: 'mailto:apluscomputersolympia@gmail.com',

  // Operating Hours
  hoursDisplay: 'Tuesday - Friday, 2:00 PM to 5:00 PM',
  hoursDays: 'Tuesday - Friday',
  hoursTime: '2:00 PM - 5:00 PM',
  schedule: [
    { day: 'Tuesday', hours: '2:00 PM – 5:00 PM', open: true },
    { day: 'Wednesday', hours: '2:00 PM – 5:00 PM', open: true },
    { day: 'Thursday', hours: '2:00 PM – 5:00 PM', open: true },
    { day: 'Friday', hours: '2:00 PM – 5:00 PM', open: true },
    { day: 'Saturday', hours: 'Closed', open: false },
    { day: 'Sunday', hours: 'Closed', open: false },
    { day: 'Monday', hours: 'Closed', open: false },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '14:00',
      closes: '17:00',
    },
  ],

  // Trust Bullets
  trustBullets: [
    'Washington State E-Cycle Partner',
    '100% Data Destruction Guaranteed',
  ],

  // Accepted Electronics
  acceptedItems: [
    {
      id: 'computers-laptops',
      title: 'Computers & Laptops',
      iconName: 'Laptop',
      description: 'Laptops, desktop PCs, towers, MacBooks, Chromebooks, servers, and power adapters.',
      examples: ['Desktop PCs & Towers', 'MacBooks & Laptops', 'Chromebooks', 'Power Cords'],
    },
    {
      id: 'phones-tablets',
      title: 'Cell Phones & Tablets',
      iconName: 'Smartphone',
      description: 'Smartphones, iPhones, Androids, iPads, tablets, and e-readers in any condition.',
      examples: ['iPhones & Androids', 'iPads & Tablets', 'E-readers', 'Chargers & Docks'],
    },
    {
      id: 'monitors-screens',
      title: 'Monitors & Screens',
      iconName: 'Monitor',
      description: 'LCD, LED, and flat panel computer monitors, displays, and screen peripherals.',
      examples: ['LCD & LED Monitors', 'Computer Displays', 'All-in-One Screens'],
    },
    {
      id: 'printers-accessories',
      title: 'Printers & Accessories',
      iconName: 'Printer',
      description: 'Printers, scanners, keyboards, mice, cords, cables, and external hardware.',
      examples: ['Printers & Scanners', 'Keyboards & Mice', 'Cords & Cables', 'Power Supplies'],
    },
  ] as AcceptedItem[],

  // Sales & Services
  salesServices: [
    {
      id: 'repair',
      title: 'Computer Repair',
      iconName: 'Wrench',
      subtitle: 'Expert diagnosis, hardware upgrades, and screen repairs',
      description: 'Fast, dependable diagnostics, component upgrades, malware removal, and screen fixes for laptops and desktop systems.',
    },
    {
      id: 'sales',
      title: 'Refurbished Sales',
      iconName: 'Laptop',
      subtitle: 'Quality, affordable, used laptops and desktop systems',
      description: 'Cleaned, tested, and certified refurbished systems ready for home, school, business, and daily productivity at great prices.',
    },
  ] as ServiceItem[],

  salesNotice: 'Yes, we buy, sell, and repair computers in addition to recycling!',

  // AEO / FAQ Items
  faqs: [
    {
      question: 'Is electronics recycling really free at A+ Computers in Olympia?',
      answer:
        'Yes! As an authorized Washington State E-Cycle Partner, standard electronics such as computers, laptops, cell phones, monitors, and tablets are accepted at zero cost for residents and qualifying organizations.',
    },
    {
      question: 'How do you protect private data on recycled computers and hard drives?',
      answer:
        'We provide 100% Data Destruction Guaranteed. Hard drives and digital storage media are securely erased or physically destroyed in compliance with industry sanitization standards to ensure your sensitive information is never recoverable.',
    },
    {
      question: 'Where can I drop off e-waste in Olympia and do I need an appointment?',
      answer:
        'No appointment needed! Just pull up and unload during our business hours at 2724 Pacific Ave SE, Olympia, WA 98501. Drop-off hours are Tuesday through Friday, 2:00 PM to 5:00 PM.',
    },
    {
      question: 'Do you also repair computers and sell refurbished laptops?',
      answer:
        'Yes! In addition to recycling, we offer expert diagnosis, hardware upgrades, screen replacements, and carry quality, affordable refurbished computers for sale.',
    },
  ] as FaqItem[],

  copyrightYear: '2028',
};
