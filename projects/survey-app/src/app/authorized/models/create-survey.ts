import { QuestionDto } from "./question-dto";

export interface CreateSurvey {
    userId: string;
    title: string;
    desc: string;
    questions: QuestionDto[];
}