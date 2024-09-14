const {  validatedoctorToken } = require("../services/DrAuthentications");
function checkFordoctorAuthenticationCookie(cookieName){
    return (req,res,next)=> {
         const tokenCookieValue = req.cookies[cookieName]
         if(!tokenCookieValue){
            return  next();
         }
         try{ 
             const doctorPayload = validateToken(tokenCookieValue);
             req.doctor = doctorPayload;
         
            }catch (error) {}
        next();
    };
}

module.exports ={
    checkFordoctorAuthenticationCookie,
}