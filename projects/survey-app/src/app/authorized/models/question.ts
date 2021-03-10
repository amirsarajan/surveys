import { QuestionType } from "./question-type";

export interface Question {
    id: string;
    content: string;
    hint: string;
    creationTime: string;
}