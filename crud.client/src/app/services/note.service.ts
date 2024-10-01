// note.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private apiUrl = 'https://localhost:7234/api/Notes'; // Atualize a URL conforme necessário

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  updateNote(note: Note): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
