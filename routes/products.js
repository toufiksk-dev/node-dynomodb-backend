import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import dynamoDB from "../dynamo.js";

const TABLE='products'

// Create Products
router.post("/create",async(req,res)=>{
    try {
        const {name,description,price}=req.body;
        const params={
            TableName:TABLE,
            Item:{
                id:uuidv4(),
                name,
                description,
                price
            }
        }

        await dynamoDB.put(params).promise();
        res.json({ message: "Product created successfully" });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
        
    }
})


// Get All products
router.get("/",async(req,res)=>{
    try {
        const params={
            TableName:TABLE

        }

        await dynamoDB.scan(params).promise();
        res.json(data.Items);
        
    } catch (err) {
                res.status(500).json({ error: err.message });

    }
})

// Get Single Product
router.get(":id",async(req,res)=>{
    try {
        const params={
            TableName:TABLE,
            Key:{
                id:req.params.id
            }
        }

        const data=await dynamoDB.get(params).promise();
        res.json(data.Item);
        
    } catch (err) {
                res.status(500).json({ error: err.message });

    }
})


// Delete products api
router.delete("/:id",async(req,res)=>{
    try {
        const params={
            TableName:TABLE,
            Key:{
                id:req.params.id
            }
        }

        await dynamoDB.delete(params).promise();
        res.json({ message: "Product deleted successfully" });
        
    }catch (err) {
       res.status(500).json({ error: err.message });

    }
})


// update products API
router.put("/:id",async(req,res)=>{
    try {
        const {name,description,price}=req.body;
        const params={
            TableName:TABLE,
            Key:{
                id:req.params.id
            },
            UpdateExpression:"set #name=:name, #description=:description, #price=:price",
            ExpressionAttributeNames: {
        "#name": "name"
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":description": description,
        ":price": price
      },
      ReturnValues: "ALL_NEW"

}

        const data=await dynamoDB.update(params).promise();
        res.json({
      message: "Product updated successfully",
      data: data.Attributes
    });

        
    } catch (error) {
     res.status(500).json({ error: err.message });

    }
})


export default router;