// news.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = 'SUA_API_KEY';
  private apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient) { }

  getCryptoNews(): Observable<NewsApiResponse> {
    const url = `${this.apiUrl}/everything?q=cryptocurrency&language=pt&apiKey=${this.apiKey}`;
    return this.http.get<NewsApiResponse>(url);
  }
}
