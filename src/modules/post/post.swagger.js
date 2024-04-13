/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreatePost:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 */

/**
 * @swagger
 * /post:
 *  post:
 *    tags:
 *      - Post
 *    summary: create new post
 *    description: create new post
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/CreatePost'
 *    responses:
 *      201:
 *        description: Created
 */

/**
 * @swagger
 * /post:
 *  get:
 *    tags:
 *      - Post
 *    summary: get all posts
 *    description: get all posts
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *    tags:
 *      - Post
 *    summary: delete a post
 *    description: delete a post
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */
