import cors from 'cors';
import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { registerValidation, loginValidation, postCreateValidation } from './validations.js';
import checkAuth from './Utils/checkAuth.js';
import handleValidationErrors from './Utils/handleValidationErrors.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
const name = '';
mongoose
    .connect('mongodb+srv://iamelhin:wwwwww@cluster0.gzhn9.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongooseDB online'))
    .catch((err) => console.log('MongooseDB err', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>
    {cb(null, 'uploads')},
    filename: (_, file, cb) =>
    {cb(null, file.originalname)},
});

const upload = multer({storage});

app.use(express.json());
app.use('/uploads', express.static('uploads'))
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register/', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload',  upload.single('image'), (req, res) =>{
    res.json({
    url: ('/uploads/' + req.file.originalname)});
});

app.get('/tag/:tags', PostController.getAllByTag);
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.get('/tags', PostController.getTags);
app.get('/allTags', PostController.getTags);
app.post('/posts', checkAuth, postCreateValidation, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, PostController.update);

app.listen(4300, (err) => {
    if (err) {
        return console.log(err);
    }
  console.log('Server online');
});