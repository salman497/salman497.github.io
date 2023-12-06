import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'example-plugin',
    styleUrls: ['./example-plugin.component.css'],
    templateUrl: './example-plugin.component.html',
})
export class AiChatExamplePluginComponent implements OnInit {
    @Output() public readonly UpdateNewFormDefinition = new EventEmitter<string>();

    

    ngOnInit() {
       
    }

   
};
