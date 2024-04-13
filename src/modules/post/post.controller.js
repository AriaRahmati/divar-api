const autoBind = require('auto-bind');
const PostService = require('./post.service');
const PostMessages = require('./post.messages');
const { StatusCodes } = require('http-status-codes');
const { categoryModel } = require('../category/category.model');

class PostController {
  #service;
  constructor() {
    autoBind(this);

    this.#service = PostService;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let match = { parent: null };
      let categories = [];
      let showBack = false;
      let options;

      if (slug) {
        slug = slug.trim();
        const category = await categoryModel.findOne({ slug });
        if (!category) {
          throw new createHttpError.NotFound(PostMessages.CategoryNotFound);
        }

        options = await this.#service.getCategoryOptions(category._id);
        options = options.length ? options : undefined;

        match = { parent: category._id };
        showBack = true;
      }

      categories = await categoryModel.aggregate([{ $match: match }]);

      res.render('pages/panel/create-post', { showBack, options, categories, category: null });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const posts = await this.#service.getAll();

      return res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const {} = req.body;

      const post = await this.#service.create({});

      return res.status(StatusCodes.CREATED).json({
        message: PostMessages.Created,
        post,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req, res, next) {
    try {
      const { id } = req.params;

      const post = await this.#service.deleteById(id);

      return res.status(StatusCodes.OK).json({
        message: PostMessages.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
