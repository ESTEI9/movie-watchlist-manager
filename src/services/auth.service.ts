import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Repository } from './repository.service';
import { AuthResult } from '../models/auth-result.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private repo: Repository,
    private snackbar: MatSnackBar
  ) { }

  async verifyMovieConnection() {
      const authResult = await this.repo.get<AuthResult>({ url: 'https://api.themoviedb.org/3/authentication' });
      if(authResult?.success) return authResult;

      this.snackbar.open('Error establishing connection.');
      console.log(authResult);
      return authResult;
  }
}
