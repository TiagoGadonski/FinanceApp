// youtube-videos.component.ts
import { Component, OnInit } from '@angular/core';
import { YoutubeService, YouTubeVideo } from '../../services/youtube.service';

@Component({
  selector: 'app-youtube-videos',
  templateUrl: './youtube-videos.component.html',
  styleUrls: ['./youtube-videos.component.css'],
})
export class YoutubeVideosComponent implements OnInit {
  videos: YouTubeVideo[] = [];

  constructor(private youtubeService: YoutubeService) { }

  ngOnInit(): void {
    this.youtubeService.getVideos().subscribe(
      (response) => {
        this.videos = response.items;
      },
      (error) => console.error(error)
    );
  }
}
