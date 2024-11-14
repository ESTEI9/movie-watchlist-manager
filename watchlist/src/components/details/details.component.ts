import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../modules/material/material.module';
import { Movie } from '../../models/movie.model';
import { CommonModule, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { Genre } from '../../models/genre.model';
import { MatDialog } from '@angular/material/dialog';
import { RemoveDialog } from '../remove-dialog/remove-dialog.component';
import { tap } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgOptimizedImage],
  providers: [
    { provide: IMAGE_LOADER, useValue: (config: ImageLoaderConfig) => `https://image.tmdb.org/t/p/original${config.src}` }
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  @Input() movie: Movie | undefined;
  @Input() genres: Genre[] = [];
  @Output() remove = new EventEmitter<void>();
  @Output('archive') doArchive = new EventEmitter<void>();
  @Output('restore') doRestore = new EventEmitter<void>();

  Math = Math;

  constructor(
    private dialog: MatDialog,
    private drawer: MatDrawer
  ) { }

  getGenre(id: number) {
    return this.genres.find(genre => genre.id === id)!.name;
  }

  restore() {
    this.doRestore.emit();
    this.drawer.close();
  }

  archive() {
    this.doArchive.emit();
    this.drawer.close();
  }

  delete() {
    const dialog = this.dialog.open(RemoveDialog, { data: this.movie });
    dialog.afterClosed().pipe(
      tap((remove: boolean) => {
        if(remove) {
          this.remove.emit();
          this.drawer.close();
        }
      })
    ).subscribe();
  }

}
