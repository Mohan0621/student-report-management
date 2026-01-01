export const requirelogin = (req,res,next)=>{
    if(!req.session || !req.session.user){
        return res.redirect('/auth/login');
}
next();
}
export const adminrequirelogin=(req,res,next)=>{
    if(!req.session || req.session.user.role!=='admin'){
        return res.redirect('/auth/login')
    }
    next();
}
export const requirestudentlogin =(req,res,next)=>{
    if(!req.session||!req.session.user.role!=='student'){
        res.redirect('/auth/login');
    }else{
        next();
    }
}