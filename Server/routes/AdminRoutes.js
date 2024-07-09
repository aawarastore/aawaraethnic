const express = require('express')
const { authenticate_admin_portal, register_Admin } = require('../controllers/AdminCredentials')
const { getUsers, getProducts, addProduct, addColor } = require('../controllers/AdminControls')
const multer = require('multer')

const AdminRouter = express.Router()

AdminRouter.post('/authenticationadmin',authenticate_admin_portal)
AdminRouter.post('/register_admin',register_Admin)


//get users
AdminRouter.get('/getusers',getUsers)

//get products:
AdminRouter.get('/getProduct',getProducts)


const storage  = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads/images')
    },
    filename:(req,file,cb)=>{

        const {PRODUCT_id,Price,color} = req.body
        if(Price) return cb(null,`${PRODUCT_id}-${Price}-${file.originalname}`)
        else{
            return cb(null,`${PRODUCT_id}-${color}-${file.originalname}`)

    }
    }
})

const upload = multer({storage})

//add products
AdminRouter.post('/addproduct',upload.single('image'),addProduct)
AdminRouter.post('/addcolor',upload.single('image'),addColor)

module.exports = AdminRouter