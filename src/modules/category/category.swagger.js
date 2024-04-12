/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateCategory:
 *        type: object
 *        required:
 *          - name
 *          - icon
 *        properties:
 *          name:
 *            type: string
 *          slug:
 *            type: string
 *          icon:
 *            type: string
 *          parent:
 *            type: string
 */

/**
 * @swagger
 * /category:
 *  post:
 *    tags:
 *      - Category
 *    summary: create new category
 *    description: create new category
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/CreateCategory'
 *    responses:
 *      201:
 *        description: Created
 */

/**
 * @swagger
 * /category:
 *  get:
 *    tags:
 *      - Category
 *    summary: get all categories
 *    description: get all categories
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *    tags:
 *      - Category
 *    summary: delete a category
 *    description: delete a category
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */
