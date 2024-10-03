// youtube.models.ts
export interface YouTubeApiResponse {
  items: YouTubeVideo[];
  // ... outros campos, se necessário
}

export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}
