const mongoose = require('mongoose')


// imgurl:   aawaraethincs_kurtaDesigning&&

const USER_LOGIN_DATA = new mongoose.Schema({
    First_Name: String,
    Last_Name: String,
    Mobile_No: Number,
    email: String,
    password: String,

},
    {
        collection: 'USER_DATA'
    })
const USER_DATA = new mongoose.model("USER_DATA", USER_LOGIN_DATA)


const USER_CART_DB = new mongoose.Schema({
    USER_CART_id: String,
    Products: [{
        Price: Number,
        product_id: String,
        product_name: String,
        Quantity: Number,
        payable_amount: Number,
        product_img_url: String,
        Size: String,
        Color: String
    }],
    Total_Quantity: Number,
    Total_Price: Number
},
    { collection: "USER_CART_DB" })
const USER_CART = new mongoose.model("USER_CART_DB", USER_CART_DB)


const PRODUCT_DB = new mongoose.Schema({
    PRODUCT_id: String,
    Product_img_url: String,
    Product_name: String,
    Price: Number, //price to be show as cut
    Discounted_Price: Number, //price to be paid
    Description: String,
    Status: String,// outof stock,available
    // Discount: Number,
    Colors: [
        {
            img_url: String,
            color: String,
            hexcode: String,
        }
    ],
    uploaded_at:{
        type:String,
        default:Date.now(),
        expires:864000
    }
},
    { collection: 'PRODUCT_DB' })
const PRODUCTS_DB = new mongoose.model('PRODUCT_DB', PRODUCT_DB)

// {
//     "PRODUCT_id": 121,
//     "Product_img_url": "http://localhost:3000/uploads/images/kurta1.jpeg",
//     "Product_name": "Mens best designing kurta",
//     "Price": 9999, 
//     "Discounted_Price": 6999,
//     "Description": 'Soft best fabric kurta',
//     "Status": "available",
//     "Colors": [
//         {
//             "img_url": "http://localhost:3000/uploads/images/kurta2.jpg",
//             "color": "lightblue",
//             "hexcode": "#ADD8E6",
//         },
//         {
//             "img_url": http://localhost:3000/uploads/images/kurta3.jpg",
//             "color":"yellow",
//             "hexcode": "#FFFF00",
//         },
//         {
//             "img_url": "http://localhost:3000/uploads/images/kurta4.jpg",
//             "color":"pink",
//             "hexcode": "#FFC0CB",
//         },
//         {
//             "img_url": "http://localhost:3000/uploads/images/kurta4.jpg",
//             "color":"lightgreen",
//             "hexcode": "#90EE90",
//         }
//     ]
// }


const USER_ORDER_DB = new mongoose.Schema({
    CART_ID: String,
    USER_ID: String,
    USER_DETAILS: [{
        firstname: String,
        lastname: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        email: String,
        mobile: String,
    }],
    ITEMS: [
        {
            Price: Number,
            product_id: String,
            product_name: String,
            Quantity: Number,
            Size: String,
            Color: String,
            Amount: Number,
        }
    ],
    Payment:Boolean,
    Total_Quantity: Number,
    Total_Price: Number,
    Transaction_ID: String,


}, { collection: 'ORDER_DB' })
const ORDER_DB = new mongoose.model("ORDER", USER_ORDER_DB)


const OTP_DB = new mongoose.Schema({
    USER_ID: String,
    Request_Mail: String,
    OTP: String,
    token: String,
    createdAt: { type: Date, default: Date.now, expires: 3000 }
}, { collection: 'OTP_DB' })

const TEMP_OTP = new mongoose.model('OTP-DB', OTP_DB)

module.exports = { USER_DATA, USER_CART, PRODUCTS_DB, TEMP_OTP, ORDER_DB }



