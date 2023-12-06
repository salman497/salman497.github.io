import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AiChatService } from '../service/ai-chat.service';



@Component({
    selector: 'ai-chat-window',
    styleUrls: ['./ai-chat-window.component.css'],
    templateUrl: './ai-chat-window.component.html',
})
export class AiChatWindowComponent implements OnInit, AfterViewChecked {
    messages$: Observable<any[]> = this.chatService.messages$;
    isProcessing$: Observable<boolean> = this.chatService.isProcessing$;
    

    @ViewChild('chatWindow') private chatWindow!: ElementRef;

    constructor(private chatService: AiChatService) {}

    ngOnInit() {
        // do proper destroy
        this.messages$.pipe(take(20)).subscribe(() => {
            this.scrollToBottom();
        });


    }

    ngAfterViewChecked() {}

    scrollToBottom(): void {
        try {
            this.chatWindow.nativeElement.scrollTop = this.chatWindow.nativeElement.scrollHeight;
        } catch (err) {}
    }
}
