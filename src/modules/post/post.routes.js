const { Router } = require('express');
const PostController = require('./post.controller');

const router = Router();

router.get('/create', PostController.createPostPage);

router.get('/', PostController.getAll);
router.post('/', PostController.create);
router.delete('/:id', PostController.deleteById);

module.exports = {
  PostRouter: router,
};
