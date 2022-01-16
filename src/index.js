require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';

//configs
import goodleAuthConfig from './config/google.config';
import routerConfig from './config/route.config';


//Routes
import Auth from './API/Auth/index';
import Restaurant from './API/Restaurant/index';
import Food from './API/Food/index';
import Menu from './API/Menu/index';
import Image from './API/Image/index';
import Order from './API/Orders/index';
import Review from './API/Reviews/index';
import User from './API/Users/index';
import MailService from './API/Mail/index';
import Payments from './API/Payments/index';

//Database connection
import ConnectDB from './database/connection';
import Router from './API/Restaurant/index';

const zomato = express();

//passport config
goodleAuthConfig(passport);
routerConfig(passport);

zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(cors());
zomato.use(helmet());

zomato.use(passport.initialize());
zomato.use(passport.session());

zomato.get("/",(req,res) => {
    res.json({message: "Setup Sucess"});
});

zomato.use("/auth",Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menu);
zomato.use("/image",Image);
zomato.use("/order",Order);
zomato.use("/review",Review);
zomato.use("/user",User);
zomato.use("/mail",MailService);
zomato.use("/payments",Payments);

zomato.listen(4000, () =>
    ConnectDB()
        .then(() => console.log("Server is up and running"))
        .catch((error) => {
            console.log(error);
            console.log(
                "Server is running, but database connection failed ..."
            );
        })
);