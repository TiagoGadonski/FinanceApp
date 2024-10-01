// note-form.component.ts
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
})
export class NoteFormComponent implements OnInit {
  @Input() noteToEdit: Note | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  noteForm: FormGroup;

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', Validators.required],
      tags: [''],
    });
  }

  ngOnInit(): void {
    if (this.noteToEdit) {
      this.noteForm.patchValue({
        title: this.noteToEdit.title,
        content: this.noteToEdit.content,
        tags: this.noteToEdit.tags ? this.noteToEdit.tags.join(', ') : '',
      });
    }
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const noteData: Note = {
        id: this.noteToEdit ? this.noteToEdit.id : 0,
        title: this.noteForm.value.title,
        content: this.noteForm.value.content,
        tags: this.noteForm.value.tags
          ? this.noteForm.value.tags.split(',').map((tag: string) => tag.trim())
          : [],
        createdAt: this.noteToEdit ? this.noteToEdit.createdAt : new Date(),
      };

      if (this.noteToEdit) {
        // Atualizar nota existente
        this.noteService.updateNote(noteData).subscribe(
          () => {
            console.log('Nota atualizada com sucesso!');
            this.noteForm.reset();
            this.formSubmitted.emit();
          },
          (error) => console.error(error)
        );
      } else {
        // Criar nova nota
        this.noteService.createNote(noteData).subscribe(
          () => {
            console.log('Nota criada com sucesso!');
            this.noteForm.reset();
            this.formSubmitted.emit();
          },
          (error) => console.error(error)
        );
      }
    }
  }

  onCancel(): void {
    this.noteForm.reset();
    this.formSubmitted.emit();
  }
}
