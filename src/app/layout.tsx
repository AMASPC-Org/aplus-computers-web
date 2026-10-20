import type { Metadata } from 'next';
import './globals.css';
import { BUSINESS } from '@/data/business';

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.canonicalUrl),
  title: 'A+ Computers Olympia | Free Electronics Recycling & Computer Repair',
  description:
    'Free local e-waste & electronics recycling in Olympia, WA. Washington State E-Cycle Partner with 100% data destruction guaranteed. Expert computer repair and quality refurbished sales.',
  keywords: [
    'Olympia electronics recycling',
    'free computer recycling Olympia',
    'e-waste recycling Olympia WA',
    'Washington State E-Cycle partner',
    'computer repair Olympia',
    'refurbished laptops Olympia',
    'laptop repair Pacific Ave Olympia',
    'electronics drop off Olympia',
    'data destruction Olympia',
    'A+ Computers Olympia',
  ],
  alternates: {
    canonical: BUSINESS.canonicalUrl,
  },
  authors: [{ name: BUSINESS.name, url: BUSINESS.canonicalUrl }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: 'A+ Computers Olympia | Free Local E-Recycling & Computer Repair',
    description:
      'Received our postcard? Drop off your e-waste & electronics with us today! Washington State E-Cycle Partner, 100% Data Destruction Guaranteed. 2724 Pacific Ave SE, Olympia, WA.',
    url: BUSINESS.canonicalUrl,
    siteName: BUSINESS.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/aistudio/A__Computers_Logo_1200x198_png_01b4d9e2.png',
        width: 1200,
        height: 630,
        alt: 'A+ Computers Olympia - Free Local E-Recycling and Repair',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A+ Computers Olympia | Free Local E-Recycling',
    description:
      'Free electronics recycling in Olympia, WA. Drop off computers, laptops, phones, monitors & printers. Easy drop-off: Pull up & unload.',
    images: ['/assets/aistudio/A__Computers_Logo_1200x198_png_01b4d9e2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region': 'US-WA',
    'geo.placename': 'Olympia',
    'geo.position': `${BUSINESS.geo.latitude};${BUSINESS.geo.longitude}`,
    ICBM: `${BUSINESS.geo.latitude}, ${BUSINESS.geo.longitude}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['RecyclingCenter', 'LocalBusiness'],
        '@id': `${BUSINESS.canonicalUrl}/#recycling-center`,
        name: BUSINESS.name,
        legalName: BUSINESS.legalName,
        url: BUSINESS.canonicalUrl,
        telephone: BUSINESS.phoneRaw,
        email: BUSINESS.email,
        priceRange: '$0 (Free Recycling)',
        image: `${BUSINESS.canonicalUrl}/assets/aistudio/A__Computers_Logo_1200x198_png_01b4d9e2.png`,
        logo: `${BUSINESS.canonicalUrl}/assets/aistudio/A__Computers_Logo_1200x198_png_01b4d9e2.png`,
        description:
          'Free local electronics recycling, e-waste drop-off, PC repair, and refurbished sales in Olympia, WA. Washington State E-Cycle Partner with guaranteed data destruction.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS.streetAddress,
          addressLocality: BUSINESS.addressLocality,
          addressRegion: BUSINESS.addressRegion,
          postalCode: BUSINESS.postalCode,
          addressCountry: BUSINESS.addressCountry,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: BUSINESS.geo.latitude,
          longitude: BUSINESS.geo.longitude,
        },
        hasMap: BUSINESS.googleMapsDirectionsUrl,
        openingHoursSpecification: BUSINESS.openingHoursSpecification,
        areaServed: [
          {
            '@type': 'AdministrativeArea',
            name: 'Olympia, WA',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Lacey, WA',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Tumwater, WA',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Thurston County, WA',
          },
        ],
        makesOffer: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Free Electronics Recycling',
              description: 'Free drop-off e-waste recycling for computers, laptops, tablets, phones, and monitors as a Washington State E-Cycle Partner.',
            },
            price: '0',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: '100% Data Destruction Guaranteed',
              description: 'Secure sanitization and physical destruction of hard drives and digital media.',
            },
          },
        ],
      },
      {
        '@type': 'ComputerStore',
        '@id': `${BUSINESS.canonicalUrl}/#computer-store`,
        name: `${BUSINESS.name} Sales & Repair`,
        url: BUSINESS.canonicalUrl,
        telephone: BUSINESS.phoneRaw,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BUSINESS.streetAddress,
          addressLocality: BUSINESS.addressLocality,
          addressRegion: BUSINESS.addressRegion,
          postalCode: BUSINESS.postalCode,
          addressCountry: BUSINESS.addressCountry,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Computer Services & Sales',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Computer Repair',
                description: 'Expert diagnosis, hardware upgrades, and screen repairs for laptops and desktops.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Product',
                name: 'Refurbished Computers and Laptops',
                description: 'Quality, affordable, inspected used laptops and desktop systems.',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${BUSINESS.canonicalUrl}/#faq`,
        mainEntity: BUSINESS.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen overflow-x-hidden flex flex-col font-sans selection:bg-green-100 selection:text-green-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

