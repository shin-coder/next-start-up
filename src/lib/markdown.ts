import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * path.join：複数のパス要素を結合してプラットフォームに適したパスを生成
 * process.cwd()：プロジェクトのルートディレクトリを取得
 */
const releasesDirectory = path.join(process.cwd(), 'content/releases');

// すべてのリリースノートを取得し、日付順にソート
export const getAllReleases = () => {
  /**
   * fs.readdirSync()：ファイルシステムから指定ディレクトリの内容を読み取り
   * 文字列の配列を返す
   */
  const fileNames = fs.readdirSync(releasesDirectory);
  const allReleasesData = fileNames.map((fileName) => {
    const version = fileName.replace(/\.md$/, '');

    const fullPath = path.join(releasesDirectory, fileName);
    /**
     * ファイルシステムから指定されたパス（fullPath）のファイル内容を同期的に読み取り
     * "utf8"エンコーディングで文字列として取得 */
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // フロントマター（メタデータ）と本文を分離
    const matterResult = matter(fileContents);

    return {
      version,
      ...(matterResult.data as {
        date: string;
        title: string;
        type: 'major' | 'minor' | 'patch';
      }),
    };
  });

  // 日付で降順ソート（最新のリリースを先頭に）
  return allReleasesData.toSorted((a, b) => {
    if (a.date < b.date) {
      return 1; // aをbより後ろに配置
    } else {
      return -1; // aをbより前に配置
    }
  });
};

// 全リリースのバージョン一覧を取得（動的ルーティング用）
export const getAllReleaseVersions = () => {
  const fileNames = fs.readdirSync(releasesDirectory);
  return fileNames.map((fileName) => {
    return {
      version: fileName.replace(/\.md$/, ''),
    };
  });
};

// 特定バージョンのリリースデータを取得
export const getReleaseData = async (version: string) => {
  const fullPath = path.join(releasesDirectory, `${version}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  // Markdown→HTML変換処理
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    version,
    contentHtml,
    ...(matterResult.data as {
      date: string;
      title: string;
      type: 'major' | 'minor' | 'patch';
    }),
  };
};
