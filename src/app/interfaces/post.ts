export interface Post{
    username:string;
    imageUrl:string;
    text:string;
    likes:string[];
    comment:Array<{username:string,comment:string}>;
}