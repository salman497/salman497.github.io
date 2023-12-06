import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AiChatService } from '../service/ai-chat.service';


@Component({
    selector: 'ai-chat-input',
    styleUrls: ['./ai-chat-input.component.css'],
    templateUrl: './ai-chat-input.component.html',
})
export class AiChatInputComponent implements OnInit {
    @Output() public readonly UpdateNewFormDefinition = new EventEmitter<string>();

    public searchString = 'Hello! Here are some examples, A form that collects information about an insurance claim OR Apply theme for me.';

    public processing$: Observable<boolean> = this.chatService.isProcessing$;


    constructor(
        private chatService: AiChatService
    ) {}

    ngOnInit() {
       
    }


    onAssistanceClick() {
        const prompt = this.searchString;
        this.searchString = '';
        this.chatService.sendMessage(prompt);
    }

};
