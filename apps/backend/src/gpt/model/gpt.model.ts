import { ApiProperty } from "@nestjs/swagger";

export class GPTResponse {
    @ApiProperty({
        description: 'Generated Presentation URL',
        required: true
    })
    presentationUrl: string;
    @ApiProperty({
        description: 'Generated Presentation Id',
        required: true,
        default: true,
    })
    presentationId: number;
}