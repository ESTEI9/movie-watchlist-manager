import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material/material.module';
import { MatDrawer } from '@angular/material/sidenav';
import { ChangeDetectorRef } from '@angular/core';
import { Movie } from '../../models/movie.model';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsComponent, CommonModule, MaterialModule],
      providers: [
        MatDrawer,
        ChangeDetectorRef
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    component.movie = new Movie();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
