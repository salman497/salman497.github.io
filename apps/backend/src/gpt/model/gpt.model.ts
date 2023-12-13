import { ApiProperty } from "@nestjs/swagger";

export class GPTResponse {
    @ApiProperty({
        description: 'URL of the generated presentation. This URL points to the location where the presentation is accessible.',
        example: 'https://example.com/presentation/12345',
        required: true
    })
    presentationUrl: string;

    @ApiProperty({
        description: 'Unique identifier for the generated presentation. This ID can be used to reference or retrieve the presentation at a later time.',
        example: 12345,
        required: false
    })
    presentationId: number;
}
