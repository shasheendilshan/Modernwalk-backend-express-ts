type rating ={
    rate:number,
    count:number
}

export interface Product {
    id:string;
    tenantId:string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?:rating;
    
}