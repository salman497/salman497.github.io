import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:4200/api/openai/generate';

  constructor(private http: HttpClient) {}

  generatePresentation(prompt: string): Observable<string> {
    return this.http.post<string>(this.apiUrl, { prompt });
  }
}
