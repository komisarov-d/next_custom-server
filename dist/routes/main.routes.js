"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Posts_1 = __importDefault(require("../models/Posts"));
const router = express_1.Router();
router.get('/', async (_req, res) => {
    try {
        const posts = await Posts_1.default.find({});
        if (!posts.length) {
            return res.json({ message: 'Posts array is empty!' });
        }
        res.status(200).json({ posts });
    }
    catch (e) {
        return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' });
    }
});
router.get('/post/:id', async (req, res) => {
    try {
        const post = await Posts_1.default.findOne({ _id: req.params.id });
        res.status(200).json({ post });
    }
    catch (e) {
        return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' });
    }
});
router.post('/create', async (req, res) => {
    try {
        const match = await Posts_1.default.findOne({ title: req.body.title });
        if (match)
            return res.json({ message: 'Alreaty exist' });
        const { title, body } = req.body;
        if (!title || !body) {
            return res.json({ message: 'Some date are empty' });
        }
        const post = new Posts_1.default({ title, body });
        post.save();
        res.status(200).json({ message: 'Success' });
    }
    catch (e) {
        return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' });
    }
});
router.delete('/remove/:id', async (req, res) => {
    try {
        await Posts_1.default.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Success remove' });
    }
    catch (e) {
        return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' });
    }
});
router.post('/:id', async (req, res) => {
    try {
        const post = await Posts_1.default.findById(req.params.id);
        if (!post) {
            return res.status(400).json({ message: 'Post not found' });
        }
        const { title, body } = req.body;
        post.title = title;
        post.body = body;
        post.save();
        res.status(200).json({ message: 'Success', post });
    }
    catch (e) {
        return res.status(500).json({ message: ' Что-то пошло не так попробуйте снова.' });
    }
});
exports.default = router;
//# sourceMappingURL=main.routes.js.map