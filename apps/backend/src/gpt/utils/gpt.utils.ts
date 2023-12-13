export function extractBase64Data(imageString: string) {
    if(imageString.includes(',')){
        let parts = imageString.split(',');
        return parts[parts.length - 1];
    }
    return imageString;
}