import {Question} from './question'

export interface Survey{
    id:string;
    title:string;
    desc:string;
    questions:string[];
    isPublished:boolean;
}