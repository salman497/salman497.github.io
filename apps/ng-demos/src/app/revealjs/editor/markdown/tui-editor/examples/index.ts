import { slide } from "./slide";

interface ExampleData {
    [key: string]: {
        markdown: string
    };
}

export const exampleData: ExampleData = {
    ...slide
}