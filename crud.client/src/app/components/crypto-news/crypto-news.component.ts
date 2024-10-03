// crypto-news.component.ts
import { Component, OnInit } from '@angular/core';
import { NewsService, NewsArticle } from '../../services/news.service';

@Component({
  selector: 'app-crypto-news',
  templateUrl: './crypto-news.component.html',
  styleUrls: ['./crypto-news.component.css'],
})
export class CryptoNewsComponent implements OnInit {
  articles: NewsArticle[] = [];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.getCryptoNews().subscribe(
      (response) => {
        this.articles = response.articles;
      },
      (error) => console.error(error)
    );
  }
}
