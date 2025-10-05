interface SiteMetaData {
  SITE_URL: string;
  SITE_NAME: string;
  SITE_DESCRIPTION: string;
  SOCIAL_MEDIA: {
    x: string;
    github: string;
  };
}

const SITE_URLS = {
  development: 'http://localhost:3000',
  production: 'https://shin-coder.github.io/next-start-up', // 本番環境のURLを指定
  test: 'http://localhost:3000',
};

// Next.jsの実行モードに応じて自動的に適切なURLを選択
const siteUrl = SITE_URLS[process.env.NODE_ENV];

export const siteMetadata = {
  SITE_URL: siteUrl,
  SITE_NAME: 'My Next Starter',
  SITE_DESCRIPTION:
    'My Next Starterは、Next.jsとshadcn/uiを使用した、最新のWeb開発体験を提供するスターターテンプレートです。',
  // 下記はダミーのURLです。実際のURLに置き換えてください。
  SOCIAL_MEDIA: {
    x: 'https://x.com/b13ocom',
    github: 'https://github.com/b13o',
  },
} as const satisfies SiteMetaData;

export const dynamic = 'force-static';
