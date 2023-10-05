import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  isLoading = true;
  time = 2000;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  ngOnInit(): void {
    // Simulate a delay (you can replace this with your actual loading logic)
    setTimeout(() => {
      this.isLoading = false; // Hide the loading screen when done
    }, 1000); // Change 2000 to the actual time it takes to load
  }

  startLoading() {
    this.isLoadingSubject.next(true);
  }

  stopLoading() {
    this.isLoadingSubject.next(false);
  }
}
