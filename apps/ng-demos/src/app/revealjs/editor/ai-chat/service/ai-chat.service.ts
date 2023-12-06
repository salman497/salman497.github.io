import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiChatService {

  private messagesSubject = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private isProcessingSubject = new BehaviorSubject<boolean>(false);
  isProcessing$ = this.isProcessingSubject.asObservable();

  constructor() { }

  sendMessage(message: string) {
    const userMessage = {
      sender: 'user',
      text: message
    };
    this.updateMessages(userMessage);

    // Triggering the three dots animation
    this.isProcessingSubject.next(true);

    // Simulating an AI response after 2 seconds
    setTimeout(() => {
      const aiMessage = {
        sender: 'ai',
        text: 'This is an AI response to: ' + message
      };
      this.updateMessages(aiMessage);
      this.isProcessingSubject.next(false);
    }, 2000);
  }

  private updateMessages(message: any) {
    const currentMessages = this.messagesSubject.getValue();
    currentMessages.push(message);
    this.messagesSubject.next(currentMessages);
  }
}
