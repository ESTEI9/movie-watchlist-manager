import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MaterialModule } from '../../modules/material/material.module';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { Genre } from '../../models/genre.model';
import { RemoveDialog } from '../remove-dialog/remove-dialog.component';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgOptimizedImage],
  providers: [
    { provide: IMAGE_LOADER, useValue: (config: ImageLoaderConfig) => `https://image.tmdb.org/t/p/w200${config.src}` }
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {

  @Input() movie: Movie | undefined;
  @Input() genres: Genre[] = [];
  @Output() remove = new EventEmitter<void>();
  @Output('archive') doArchive = new EventEmitter<void>();
  @Output('restore') doRestore = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog
  ) { }

  delete() {
    const dialog = this.dialog.open(RemoveDialog, { data: this.movie });
    dialog.afterClosed().pipe(
      tap((confirm: boolean | undefined) => {
        if(confirm) this.remove.emit();
      })
    ).subscribe();
  }

  archive() {
    this.doArchive.emit();
  }

  restore() {
    this.doRestore.emit();
  }

  viewDetails() {
    this.open.emit();
  }

}
