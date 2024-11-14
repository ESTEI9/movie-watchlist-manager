import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDialog } from './remove-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockDialogRef } from '../../mocks/dialog-ref.mock';
import { Movie } from '../../models/movie.model';

describe('RemoveDialog', () => {
  let component: RemoveDialog;
  let fixture: ComponentFixture<RemoveDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveDialog],
      providers: [
        { provide: MatDialogRef, useClass: MockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: new Movie() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
