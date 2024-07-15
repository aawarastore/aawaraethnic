const express = require('express')
const { authenticate_admin_portal, register_Admin } = require('../controllers/AdminCredentials')
const { getUsers, getProducts, addProduct, addColor, updateProducts } = require('../controllers/AdminControls')
const multer = require('multer')

const AdminRouter = express.Router()

AdminRouter.post('/authenticationadmin',authenticate_admin_portal)
AdminRouter.post('/register_admin',register_Admin)


//get users
AdminRouter.get('/getusers',getUsers)

//get products:
AdminRouter.get('/getProduct',getProducts)

//edit product
AdminRouter.post('/updateProduct',updateProducts)

const storage  = multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads/images')
    },
    filename:(req,file,cb)=>{

        const {PRODUCT_id,Product_Color,color} = req.body
        if(Product_Color) return cb(null,`${PRODUCT_id}-${Product_Color}-${file.originalname}`)
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