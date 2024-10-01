// note.component.ts
import { Component, OnInit } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-note',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];
  selectedNote: Note | null = null;
  noteToEdit: Note | null = null;
  showForm: boolean = false;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe(
      (notes) => (this.notes = notes),
      (error) => console.error(error)
    );
  }

  selectNote(note: Note): void {
    this.selectedNote = note;
    this.noteToEdit = null;
    this.showForm = false;
  }

  editNote(note: Note): void {
    this.noteToEdit = note;
    this.selectedNote = null;

    const modalElement = document.getElementById('noteModal');
    const modal = new Modal(modalElement!);  // Using '!' to ensure the element is non-null
    modal.show();  // Show the modal
    this.showForm = true;
  }


  addNote(): void {
    this.noteToEdit = null;
    this.selectedNote = null;
    const modalElement = document.getElementById('noteModal');
    const modal = new Modal(modalElement!);  // Using '!' to ensure the element is non-null
    modal.show();
    this.showForm = true;
  }

  deleteNote(id: number): void {
    this.noteService.deleteNote(id).subscribe(
      () => {
        this.notes = this.notes.filter((n) => n.id !== id);
        this.selectedNote = null;
      },
      (error) => console.error(error)
    );
  }

  onFormSubmitted(): void {
    this.getNotes();
    this.showForm = false;
    this.noteToEdit = null;
  }
}
