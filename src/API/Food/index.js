//libraries
import express from 'express';

//Database Modal
import { FoodModel } from '../../database/allModels';

//validate
import { ValidateRestaurantId, ValidateCategory } from '../../validation/food';

const Router = express.Router();

/*
Route               food/:_id
Description         Get all food based on a particular restaurant
Params              id
Access              Public
Method              GET
*/
Router.get("/:_id", async(req,res) => {
    try{
        const {_id} = req.params;
        const foods = await FoodModel.findById(_id);
        return res.json({foods});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route               food/r/:_id
Description         Get all food based on a particular restaurant
Params              id
Access              Public
Method              GET
*/
Router.get('/r/:_id', async(req,res) => {
      try{
          await ValidateRestaurantId(res.params);
         const {_id} = req.params;

         const foods = await FoodModel.find({restaurant: _id})

         return res.json({ foods });
      }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route               /food/r/:category
Description         Get all food based on a particular category
Params              category
Access              Public
Method              GET
*/
Router.get("/r/:category",async(req,res) => {
    try{
        await ValidateCategory(res.params);
         const {category} = req.params;

         const foods = await FoodModel.find({
             category: { $regex: category, $options: "i"},
         })

         return res.json({foods});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;

