const express=require('express');
const auth=require('../middleware/auth');
const router=new express.Router();
const {createArticles,getArticles,getArticle,updateArticle,deleteArticle,getAllArticles}=require('../controllers/articlesControllers')

router.post('/',auth,createArticles);
router.get('/',getAllArticles);
router.get('/',auth,getArticles);
router.get('/:id',auth,getArticle);
router.put('/:id',auth,updateArticle)
router.delete('/:id',auth,deleteArticle)
module.exports=router;