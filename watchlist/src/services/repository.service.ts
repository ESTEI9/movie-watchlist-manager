import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, first, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Repository {

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) { }

  async get<T = any>(request: { url: string; params?: {[x: string]: any }}): Promise<T | null> {
    return lastValueFrom(this.http.get<T>(request.url, { params: request.params }).pipe(
      first(),
      catchError(e => { this.snackbar.open('There was an error'); throw e; }),
    ))
  }
}
