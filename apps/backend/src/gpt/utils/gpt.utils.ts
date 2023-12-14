import { presentationEndingContent } from "./gpt.ending";

export function extractBase64Data(imageString: string) {
    if(imageString.includes(',')){
        let parts = imageString.split(',');
        return parts[parts.length - 1];
    }
    return imageString;
}

export function updateMarkdownContent(markdown: string): string {
    let newContent = markdown;
    if(!endsWithAsterisks(markdown)){
        newContent += `
        
        ***
        
        `;
    } 
    newContent += presentationEndingContent;
    return newContent;
}

function endsWithAsterisks(input: string): boolean {
    // Trim right side of the string to remove spaces, newlines, or any empty characters
    const trimmedInput = input.replace(/[\s\n]+$/, '');
  
    // Check if the trimmed string ends with '***'
    return trimmedInput.endsWith('***');
  }