import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import dynamoDB from "../dynamo.js";

const TABLE = process.env.TABLE_NAME;

//  Create Contact
router.post("/create",async(req,res)=>{
    try {
        const {name,email,phone}=req.body;

        const params={
            TableName:TABLE,
            Item:{
                id:uuidv4(),
                name,
                email,
                phone
            }
        };


        await dynamoDB.put(params).promise();

    res.json({ message: "Contact created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });

    }
})


// GET ALL CONTACTS
router.get("/",async(req,res)=>{
    try {
        const params={
            TableName:TABLE
        }
        const data=await dynamoDB.scan(params).promise();
        res.json(data.Items);
       
    } catch (err) {
        res.status(500).json({ error: err.message });

        
    }
})


// GET SINGLE CONTACT
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
        
    } catch (error) {
            res.status(500).json({ error: err.message });
    }
})


// UPDATE CONTACT
router.put("/:id",async(req,res)=>{
    try {
        const {name,email,phone}=req.body;
        const params={
            TableName:TABLE,
            key:{
                id:req.params.id
            },
            UpdateExpression:"set #name=:name, #email=:email, #phone=:phone",
              ExpressionAttributeNames: {
        "#name": "name"
      },
      ExpressionAttributeValues: {
        ":name": name,
        ":email": email,
        ":phone": phone
      },
      ReturnValues: "ALL_NEW"

            
        }

        const data=await dynamoDB.update(params).promise();

    res.json({
      message: "Contact updated successfully",
      data: data.Attributes
    });


        
    } catch (err) {
  res.status(500).json({ error: err.message });

    }
})

// Delete Contact
router.delete("/:id",async(req,res)=>{
    try {
        const params={
            TableName:TABLE,
            Key:{
                id:req.params.id
            }
        }
        await dynamoDB.delete(params).promise();
        res.json({ message: "Contact deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });

    }
})

export default router;