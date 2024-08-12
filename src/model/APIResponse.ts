import { Customer } from "./Customer";

export interface CustomerAPIResponse{
    info:{
        page:number;
        results:number;
        seed:string;
    },
    results:Customer[],
    error: string
}