   
const jwt = require('jsonwebtoken');

module.exports ={
        
    authenticate:async function(req,res,next){

        try{

            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new Error("Authorization token is missing."); 
            }
        
            const token = authHeader.split(' ')[1];
        
            jwt.verify(token, process.env.token_secret, (err, user) => {
        
                if (err) {
                    throw new Error(err);
                }
                
                req.user=user;
                next();
            });
        }catch(err){
            res.json({"status":400,"message":err.message})
        }
    }
}
   