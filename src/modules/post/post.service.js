const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const { postModel } = require('./post.model');
const PostMessages = require('./post.messages');
const categoryService = require('../category/category.service');
const { optionModel } = require('../option/option.model');

class PostService {
  constructor() {
    autoBind(this);
  }

  async getAll() {
    const posts = await postModel.find({});

    return posts;
  }

  async create(createPostDto) {
    const newPost = await postModel.create(createPostDto);

    return newPost;
  }

  async deleteById(_id) {
    const post = await this.checkExistById(_id);

    await post.deleteOne();

    return true;
  }

  async checkExistById(_id) {
    const post = await postModel.findById(_id);
    if (!post) {
      throw new createHttpError.NotFound(PostMessages.NotFound);
    }

    return post;
  }

  async getCategoryOptions(categoryId) {
    const options = await optionModel.find({ category: categoryId });

    return options;
  }
}

module.exports = new PostService();
