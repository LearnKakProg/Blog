import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({
            path:"user",
            select: ["fullName", "avatarUrl"]
        }).sort({
            createdAt: -1 //сортировка по дате
        });


        res.json(posts);
    }   catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const getTags = async (req, res) => {
    try {
        const posts = await PostModel.find().sort({
            createdAt: -1 //сортировка по дате
        }).exec();
        const allTags = posts
            .map((obj) => obj.tags)
            .flat()
            .filter((space) => space !== "" || " ")
        res.json(allTags);
    }   catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить теги',
        });
    }
};

export const getAllByTag = async (req, res) => {
    try {
        const postTag = req.params.tags
        const posts = await PostModel.find({tags: {$in: [postTag]}}
        ).populate({
            path:"user",
            select: ["fullName", "avatarUrl"]
        }).sort({
            createdAt: -1 //сортировка по дате
        });



        res.json(posts);
    }   catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи по тегу',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: "After" }).populate('user')
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({ message: "Статья не найдена" }));
    }   catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статью',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findOneAndDelete(
            { _id: postId })
            .then(doc => res.json({message: 'Статья удалена'}))
            .catch(err => res.status(500).json({ message: "Статья не найдена" }));
    }   catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Не удалось найти статью',
        });
    }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
        title:req.body.title,
        text:req.body.text,
        imageUrl:req.body.imageUrl,
        tags: req.body.tags.slice(','),
        isPublic:req.body.isPublic,
        user:req.userId,
    });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {_id: postId},
            {title:req.body.title,
             text:req.body.text,
             tags: req.body.tags,
             imageUrl:req.body.imageUrl,
             user:req.userId});

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью'
        });
    }
};