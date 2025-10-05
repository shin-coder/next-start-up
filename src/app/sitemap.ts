import { MetadataRoute } from 'next';
import { getAllReleaseVersions } from '@/lib/markdown';
import { siteMetadata } from '@/constants/site-metadata';

const baseUrl = siteMetadata.SITE_URL;

export const siteMap = async (): Promise<MetadataRoute.Sitemap> => {
  const releaseVersions = getAllReleaseVersions();

  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const releasePages = releaseVersions.map((version) => {
    return {
      url: `${baseUrl}/releases/${version.version}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  return [...staticPages, ...releasePages];
};
