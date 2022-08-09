import express, { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import {v4 as uuidv4} from 'uuid';
import data from './../db.js';
import { IProduct } from './../Interfaces/products.interface';

const productsRouter = express.Router();

productsRouter.get("/", (req: Request, res: Response) => {
  res.send(data.products);

});

productsRouter.get("/:id", (req: Request, res: Response) => {
   
    const { id } = req.params;

    const product = data.products.find((prod)=>prod.id===id);
    if(product){
       const response ={
        message:"product found",
        data:product
       }
       res.send(JSON.stringify(response));
    }else{
      const response ={
        message:"product not found",
        data:null
       }
       res.send(JSON.stringify(response));
    }

});


productsRouter.post("/", async(req: Request, res: Response) => {

if(req.body.product){
  const {tenantId,title,price,description,category,image,rating} = req.body?.product;
  if(tenantId&&title&&price&&description&&category&&image){

 const product:IProduct = {
    id:uuidv4(),
    tenantId:tenantId,
    title: title,
    price: price,
    description: description,
    category: category,
    image: image,
    rating:rating,
  }
  
  readFile('./dist/data/products.json','utf8', (err, data) => {
      if (err) throw err;
      let allProducts = JSON.parse(data);
      allProducts.push(product);

      writeFile('./src/data/products.json',JSON.stringify(allProducts),(err)=>{
        if (err) throw err;
      })

    })
    
    const response ={
      message :"Product Added successfully",
      data:product
    }

    res.send(JSON.stringify(response));
  }else{
    const response ={
      message :"Data add Failed",
      data:null
    }
    res.send(JSON.stringify(response));

  }
}else{

  const response ={
    message :"Invalid request",
    data:null
  }
  res.send(JSON.stringify(response));
}
  
  
});

export default productsRouter;
