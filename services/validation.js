const zod = require("zod");
const logger = require("../logger");

const productValidation = (req, res, next) => {
  try {
    const productSchema = zod.object({
      id: zod.number(),
      name: zod.string().min(3),
      price: zod.number(),
      category_id: zod.number(),
    });
    req.body = productSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const putProductValidation = (req, res, next) => {
  try {
    const productSchema = zod.object({
      name: zod.string().min(3),
      price: zod.number(),
      category_id: zod.number(),
    });
    req.body = productSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const categoryValidation = (req, res, next) => {
  const categoryLogger = logger.categoryLogger;
  try {
    const categorySchema = zod.object({
      id: zod.number(),
      name: zod.string().min(3),
    });
    req.body = categorySchema.parse(req.body);
    categoryLogger.categoryValidationSuccess();
    next();
  } catch (error) {
    categoryLogger.categoryValidationFailed();
    res.status(400).json(error.message);
  }
};
const putCategoryValidation = (req, res, next) => {
  const categoryLogger = logger.categoryLogger;
  try {
    const categorySchema = zod.object({
      name: zod.string().min(3),
    });
    req.body = categorySchema.parse(req.body);
    categoryLogger.categoryValidationSuccess();
    next();
  } catch (error) {
    categoryLogger.categoryValidationFailed();
    res.status(400).json(error.message);
  }
};

const userLogin = (req, res, next) => {
  try {
    const userSchema = zod.object({
      email: zod.string().min(3),
      password: zod
        .string()
        .min(8)
        .regex(/[a-z]/)
        .regex(/[A-Z]/)
        .regex(/[!@#$%^&*()]/),
    });
    req.body = userSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const userRegister = (req, res, next) => {
  try {
    const userSchema = zod.object({
      email: zod.string().min(3),
      password: zod
        .string()
        .min(8)
        .regex(/[a-z]/)
        .regex(/[A-Z]/)
        .regex(/[!@#$%^&*()]/),
      passwordRepeat: zod
        .string()
        .min(8)
        .regex(/[a-z]/)
        .regex(/[A-Z]/)
        .regex(/[!@#$%^&*()]/),
    }).refine((data) => data.password === data.passwordRepeat, {
      message: "Passwords don't match",
      path: ["passwordRepeat"],
    });
    req.body = userSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json(JSON.parse(error.message));
  }
};
module.exports = {
  productValidation,
  categoryValidation,
  putCategoryValidation,
  putProductValidation,
  userLogin,
  userRegister,
};
