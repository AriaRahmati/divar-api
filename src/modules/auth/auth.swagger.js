/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth Module and Routes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      SendOTP:
 *        type: object
 *        required:
 *          - mobile
 *        properties:
 *          mobile:
 *            type: string
 *      checkOTP:
 *        type: object
 *        required:
 *          - mobile
 *          - code
 *        properties:
 *          mobile:
 *            type: string
 *          code:
 *            type: string
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Login or register with OTP
 *    description: Login or register with OTP
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/SendOTP'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/SendOTP'
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /auth/check-otp:
 *  post:
 *    tags:
 *      - Auth
 *    summary: check OTP
 *    description: check OTP and login user
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            $ref: '#/components/schemas/checkOTP'
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/checkOTP'
 *    responses:
 *      200:
 *        description: Success
 */