const { Router } = require('express');
const CategoryController = require('./category.controller');

const router = Router();

router.get('/', CategoryController.getAll);
router.post('/', CategoryController.create);

module.exports = {
  CategoryRouter: router,
};
