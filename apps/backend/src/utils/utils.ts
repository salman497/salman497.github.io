
export function generateRandomId(length: number = 11): number {
    if (length < 1 || length > 15) {
        throw new Error('Length must be between 1 and 15');
    }

    // Generate first digit (1 to 9) to ensure it's not leading zero
    let randomNumber: number = 1 + Math.floor(Math.random() * 9);

    // Generate the rest of the digits
    for (let i: number = 1; i < length; i++) {
        randomNumber *= 10;
        randomNumber += Math.floor(Math.random() * 10);
    }

    return randomNumber;
}