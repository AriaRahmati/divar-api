/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CreateOption:
 *        type: object
 *        required:
 *          - title
 *          - key
 *          - type
 *          - category
 *        properties:
 *          title:
 *            type: string
 *          key:
 *            type: string
 *          guide:
 *            type: string
 *          required:
 *            type: boolean
 *          type:
 *            type: string
 *            enum:
 *              - number
 *              - string
 *              - boolean
 *              - array
 *          category:
 *            type: string
 *          enum:
 *            type: array
 *            items:
 *              type: string
 *      UpdateOption:
 *        type: object
 *        properties:
 *          title:
 *            type: string
 *          key:
 *            type: string
 *          guide:
 *            type: string
 *          required:
 *            type: boolean
 *          type:
 *            type: string
 *            enum:
 *              - number
 *              - string
 *              - boolean
 *              - array
 *          category:
 *            type: string
 *          enum:
 *            type: array
 *            items:
 *              type: string
 */

/**
 * @swagger
 * /option:
 *  post:
 *    tags:
 *      - Option
 *    summary: create new option
 *    description: create new option
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/CreateOption'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateOption'
 *    responses:
 *      201:
 *        description: Created
 */

/**
 * @swagger
 * /option:
 *  get:
 *    tags:
 *      - Option
 *    summary: get all options
 *    description: get all options
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /option/{optionId}:
 *  get:
 *    tags:
 *      - Option
 *    summary: get option by id
 *    description: get option by id
 *    parameters:
 *      - in: path
 *        name: optionId
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *    tags:
 *      - Option
 *    summary: get all options of category by id
 *    description: get all options of category by id
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /option/by-category-slug/{slug}:
 *  get:
 *    tags:
 *      - Option
 *    summary: get all options of category by slug
 *    description: get all options of category by slug
 *    parameters:
 *      - in: path
 *        name: slug
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /option/{id}:
 *  delete:
 *    tags:
 *      - Option
 *    summary: deletes option
 *    description: deletes option
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /option/{id}:
 *  put:
 *    tags:
 *      - Option
 *    summary: updates an option
 *    description: updates an option
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/UpdateOption'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UpdateOption'
 *    responses:
 *      200:
 *        description: Success
 */
