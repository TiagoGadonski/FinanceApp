// youtube.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { YouTubeApiResponse } from '../models/youtube.models';
export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private apiKey = 'SUA_API_KEY';
  private channelId = 'SEU_CHANNEL_ID';
  private apiUrl = 'https://www.googleapis.com/youtube/v3';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<YouTubeApiResponse> {
    const url = `${this.apiUrl}/search?key=${this.apiKey}&channelId=${this.channelId}&part=snippet,id&order=date&maxResults=10`;
    return this.http.get<YouTubeApiResponse>(url);
  }
}
