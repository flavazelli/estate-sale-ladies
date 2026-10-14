import listingData from './upcomingSales.json';

export type SaleListing = {
  slug: string;
  title: string;
  dateLabel: string;
  location: string;
  coverImage?: string;
  coverAlt?: string;
  coverTone?: 'blush' | 'rose' | 'ink';
  summary?: string;
  photos: Array<{ src: string; alt: string }>;
  featuredItems: string[];
};

// Add entries to upcomingSales.json when confirmed sale details and photos are available.
export const upcomingSales = listingData as SaleListing[];
