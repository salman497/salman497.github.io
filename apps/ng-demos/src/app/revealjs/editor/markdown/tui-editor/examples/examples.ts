import { chartJs } from "./chartjs";
import { mermaid } from "./mermaid";
import { revealJs } from "./revealjs";
import { slide } from "./slide";

interface ExampleData {
    [key: string]: {
        markdown: string,
        html: string
    };
}

export const exampleData: ExampleData = {
    ...slide,
    ...mermaid,
    ...revealJs,
    ...chartJs
}