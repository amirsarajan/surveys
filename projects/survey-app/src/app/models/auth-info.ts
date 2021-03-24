
import {UserInfo} from './user-info';

export interface AuthInfo{
    userInfo?:UserInfo;
    token?:string;
    expires?:Date;
    message?:string;
}