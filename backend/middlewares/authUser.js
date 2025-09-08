import jwt from 'jsonwebtoken'

//user authentication middleware
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers  //admintoken
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized Login Again' })
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)

       // if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        //   return res.json({ success: false, message: 'Not Authorized Login Again' })
        //}  
        req.userId = token_decode.id  //req.body.userId
        //req.user = {id:token_decode.id};
        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export default authUser