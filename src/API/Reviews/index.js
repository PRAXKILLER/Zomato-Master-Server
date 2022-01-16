//libraries
import express from 'express';
import passport from 'passport';

//database schema
import { ReviewModel } from '../../database/allModels';

const Router = express.Router();

/*
Route           /review/:resid
Desc            Get all reviews related to particular restaurant
Params          resid
Access          Public
Method          GET
*/
Router.get("/:resid",async(req,res) => {
    try{
        const {resid} = req.params;
        const reviews = await ReviewModel.find({restaurant: resid});
        return res.json({reviews});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /review/new
Desc            Add new food review/rating
Body            review obj
Params          none
Access          Private
Method          POST
*/
Router.post("/new",passport.authenticate("jwt"),async(req,res) => {
    try{ 
        const {_id} = req.session.passport.user._doc;
        const {reviewData} = req.body;

        await ReviewModel.create({...reviewData, user: _id});

        return res.json({review: "Successfully Created Review"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
Route           /review/delete
Desc            Delete food review/rating
Body            none
Params          _id
Access          Public
Method          Delete
*/
Router.delete("/delete", async(req,res) => {
    try{
         const {_id} = req.params;
         await ReviewModel.findByIdAndDelete(_id);

         return res.json({review: "Successfully Deleted Review"});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

export default Router;