import { Component, Inject } from "@angular/core";
import { MaterialModule } from "../../modules/material/material.module";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Movie } from "../../models/movie.model";
import { Dialog } from "@angular/cdk/dialog";

@Component({
  selector: '',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Confirm Removal</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        Are you sure you want to remove {{ movie.title }} from your watch list?
      </mat-card-content>
      <mat-card-actions>
        <button mat-flat-button (click)="confirm()">Yes</button>
        <button mat-button (click)="deny()">No</button>
      </mat-card-actions>
    </mat-card>
  `,
  standalone: true,
  styleUrl: './remove-dialog.component.scss',
  imports: [
    MaterialModule
  ]
})

export class RemoveDialog {
  constructor(
    public ref: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public movie: Movie
  ) { }

  confirm() {
    this.ref.close(true);
  }

  deny() {
    this.ref.close();
  }
}