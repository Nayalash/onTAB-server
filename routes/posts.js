const router = require('express').Router();
const verify = require('./verifyToken');


//
router.post('/add', verify, (req,res) => {

});



// //Display User Posts
// router.get('/', verify, (req,res) => {
//     res.json(
//         {
        
//         posts: 
//             {
//                 expense: 
                
//                 {
//                     title: "hi",
//                     price: 25.00
//                 },

//                 expense: 
                
//                 {
//                     title: "pi",
//                     price: 25.00
//                 },

            
//             }
//         }
//     );
// });

















module.exports = router;