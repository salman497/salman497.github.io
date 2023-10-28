import { mermaid } from "./mermaid";
import { slide } from "./slide";

interface ExampleData {
    [key: string]: {
        markdown: string,
        html: string
    };
}

export const exampleData: ExampleData = {
    ...slide,
    ...mermaid
}