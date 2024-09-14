const { validateToken } = require("../services/authentications");
function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=> {
         const tokenCookieValue = req.cookies[cookieName]
         if(!tokenCookieValue){
            return  next();
         }
         try{ 
             const userPayload = validateToken(tokenCookieValue);
             req.user = userPayload;
         
            }catch (error) {}
        next();
    };
}

module.exports ={
    checkForAuthenticationCookie,
}