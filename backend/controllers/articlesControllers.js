const Article=require('../models/articles');
const User=require('../models/user')
const mongoose=require('mongoose')
const createArticles=async(req,res)=>{
        
        const article=new Article({
            
            ...req.body,
            user:req.user._id
            
        })
        try{
            await article.save()
            res.status(200).send(article)
        }catch(e){
            res.status(400).send(e)
        }

    }


const getArticles= async (req, res) => {
    try {
        const articles = await Article.find({ user: req?.user?._id });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getArticle = async (req, res) => {
    try {
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};




const updateArticle= async (req, res) => {
    try {
        
        const user = await User.findById(req?.user.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Validate product ID
        const articleId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({ message: 'Invalid Article ID format' });
        }

        // Validate product
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Check authorization
        if (article?.user?.toString() !== req?.user?.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update product
        const updatedArticle = await Article.findByIdAndUpdate(articleId, req?.body, { new: true });
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article update failed' });
        }

        res.status(200).json(updateArticle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};




const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req?.params?.id);
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Ensure the product belongs to the authenticated user
        if (article?.user?.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Remove the product using findByIdAndDelete
        await Article.findByIdAndDelete(req.params.id);

        return res.status(200).json({ success: true, id: article._id, message: 'Article deleted successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();  // Get all articles without filtering by user
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



module.exports={
    createArticles,
    getArticles,
    getArticle,
    updateArticle,
    deleteArticle,
    getAllArticles,
 
}