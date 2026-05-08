/*
export interface VideoContract{
    video_id:number;
    title:string;
    description:string;
    url:string;
    likes:number;
    dislikes:number;
    views:number;
    comments:string;
    category_id:number;
}*/

export interface VideoContract {
    video_id: number;

    title: string;
    description?: string;
    url: string;

    likes: number;
    dislikes?: number;
    views?: number;

    comments?: string;
    category_id?: number;
    category_name?:string;
}