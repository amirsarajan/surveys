import {Question} from './question'
import { SurveyTitle } from './survey-title';

export interface Survey extends SurveyTitle{   
    questions:Question[];
}