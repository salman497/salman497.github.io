import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AiChatService } from './service/ai-chat.service';

@Component({
    selector: 'ai-chat',
    templateUrl: './ai-chat.component.html',
    providers: [AiChatService],
    animations: [
        trigger('slideLeftRight', [
            state('true', style({ transform: 'translateX(0)' })),
            state('false', style({ transform: 'translateX(-100%)' })),
            transition('* => *', animate('0.25s ease-in-out')),
        ]),
    ],
})
export class AIChatComponent implements OnInit {
    @Output() public readonly UpdateNewFormDefinition = new EventEmitter<string>();
    @Output() public readonly ShowAdminArea = new EventEmitter<string>();
    @Input() context = '';


    constructor() {}

    ngOnInit() {

    }



}
