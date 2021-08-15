
const dbConnection=require("../config/connection");
const UserModel=require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports ={

    /**
     * @author Mukul Kashyap
     * @param {*} req 
     * signup for user
     */
    signup:async function(req,res){

        var json=[];

        try{

            const {name,email, password} = req.body

            const checkEmailExist=await UserModel.find({email:email});

            if(checkEmailExist.length>0){
                throw new Error("User Email already exist.Try another one.");
            }

            const last_login_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            var dataObject={name:name,email:email,password:bcrypt.hashSync(password, 10),status:0,last_login_ip:last_login_ip,created_at:Date()};

            await UserModel.create(dataObject);
            json={status:200,message:"User created successfully"};
        }catch(err){
            json={status:400,message:err.message};
        }

        res.json(json)
    },

    /**
     * @author Mukul Kashyap
     * @param {*} req 
     * login using email and password
     */
    login:async function(req,res){

        var json=[];

        try{

            const {email, password} = req.body

            const userExist=await UserModel.findOne({email:email});

            if(!userExist){
                throw new Error("The account with email does not exist.");
            }else{

                if (!bcrypt.compareSync(password, userExist.password)) {
                    throw new Error("Password did not matched.Please try again");
                }

                if(userExist.status==0){
                    throw new Error("Your account is not verified.Please verify your account first.");
                }

                var token=jwt.sign(
                    {id: userExist._id}, // object and not string
                    process.env.token_secret,
                    {expiresIn: '3600s'} // added days
                );
                json={"status":200,"message":"Login successfully","token":token};
            }
        }catch(err){
            json={"status":400,"message":err.message};
        }
        res.json(json)
    },

    /**
     * @author Mukul Kashyap
     * function to get user profile
     */
    getUserProfile:async function(req,res){

        var json={};
        try{

            var user_id=req.user.id;

            const userInfo= await UserModel.findById(user_id);

            var data={name:userInfo.name,email:userInfo.email};
            json={"status":200,"message":"Users fetched successfully.",data:data};
           
        }catch(err){
            json={"status":400,"message":err.message};
        }
        res.json(json)
    }

}

