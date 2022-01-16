//libraries
import express from 'express';

//Database Modal
import { RestaurantModel } from '../../database/allModels';

//validate
import {ValidateRestaurantCity, ValidateRestaurantSearchString} from '../../validation/restaurant';
import ValidateRestaurantId from '../../validation/food';

const Router = express.Router();

/*
Route               /restaurant
Description         Get all rrestaurants details based on city name
Params              none
Access              Public
Method              GET
*/
Router.get("/", async (req, res) => {
    try {
      await ValidateRestaurantCity(req.query);
      const { city } = req.query;
      const restaurants = await RestaurantModel.find({ city });
  
      return res.json({ restaurants });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

/*
Route               /restaurant
Description         Get individual restaurant details based on ID
Params              _id
Access              Public
Method              GET
*/
Router.get('/:_id', async(req,res) => {
    try{
        // await ValidateRestaurantId(req.params);
        const {_id} = req.params;
        const restaurants = await RestaurantModel.findById(_id);

        if(!restaurants){
            return res.status(404).json({error: "Restaurants Not Found"});
        }

        return res.json({ restaurants});
    }catch(error){
        return res.status(500).json({error: error});
    }
});

/*
Route               /restaurant/search
Description         Get restaurant details on search string
Params              none
Access              Public
Method              GET
*/
Router.get("/search", async(req,res) => {
    try{
        await ValidateRestaurantSearchString(req.params);
        const { searchString } = req.body;

        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options:"i" },
        });

        if(!restaurants){
            return res.status(404).json({error: `No Restaurant matched with ${searchString}`});
        }

        return res.json({ restaurants});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});
export default Router;