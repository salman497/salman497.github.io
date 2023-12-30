import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule
  ]
})
export class ContactusComponent {
  contactForm: FormGroup;
  submissionSuccess = true; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      type: ['feedback', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form Values', this.contactForm);
    if (this.contactForm.valid) {
      // http://localhost:3000/contact
      // https://api.presenty.app/contact
      this.http.post('https://api.presenty.app/contact', this.contactForm.value).pipe(
        catchError((error) => {
          console.error('Error sending contact form:', error);
          return of({ success: false, error: error.message });
        })
      ).subscribe(response => {
        if ((response as any).success) {
          this.submissionSuccess = true; // Update the flag on successful submission
          this.contactForm.reset();
        }
        console.log('Response:', response);
      });
    }
  }
}
