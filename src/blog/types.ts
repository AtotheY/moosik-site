export type GuideCategory = 'Listening stats' | 'Queue & library' | 'Desktop player';

export interface ArticleDatesAndLinks {
  publishedAt: string;
  updatedAt?: string;
  related: [string, string];
}

export interface GuidePost extends ArticleDatesAndLinks {
  slug: string;
  title: string;
  searchTitle?: string;
  description: string;
  category: GuideCategory;
  body: string;
}
