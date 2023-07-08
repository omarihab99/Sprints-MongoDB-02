const joi = require("joi");
// const productValidation = (req, res, next) => {
//   try {
//     const productSchema = zod.object({
//       id: zod.number(),
//       name: zod.string().min(3),
//       price: zod.number(),
//       category_id: zod.number(),
//     });
//     req.body = productSchema.parse(req.body);
//     next();
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };
// const putProductValidation = (req, res, next) => {
//   try {
//     const productSchema = zod.object({
//       name: zod.string().min(3),
//       price: zod.number(),
//       category_id: zod.number(),
//     });
//     req.body = productSchema.parse(req.body);
//     next();
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };
// const categoryValidation = (req, res, next) => {
//   const categoryLogger = logger.categoryLogger;
//   try {
//     const categorySchema = zod.object({
//       id: zod.number(),
//       name: zod.string().min(3),
//     });
//     req.body = categorySchema.parse(req.body);
//     categoryLogger.categoryValidationSuccess();
//     next();
//   } catch (error) {
//     categoryLogger.categoryValidationFailed();
//     res.status(400).json(error.message);
//   }
// };
// const putCategoryValidation = (req, res, next) => {
//   const categoryLogger = logger.categoryLogger;
//   try {
//     const categorySchema = zod.object({
//       name: zod.string().min(3),
//     });
//     req.body = categorySchema.parse(req.body);
//     categoryLogger.categoryValidationSuccess();
//     next();
//   } catch (error) {
//     categoryLogger.categoryValidationFailed();
//     res.status(400).json(error.message);
//   }
// };
// TODO: remove above function
const userLogin = (req, res, next) => {
  try {
    const userSchema = joi.object({
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .required()
        .pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        )
        .messages({
          "string.pattern.base":
            "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character.",
          "string.empty": "Password cannot be empty",
        }),
    });
    const { error } = userSchema.validate(req.body);
    if (error) throw error;
    next();
  } catch (error) {
    if (typeof error === joi.ValidationError) {
      const errorMessage = error.details.map((e) => e.message).join(", ");
      res.status(400).json(errorMessage);
    }
    res.status(400).json(error.message);
  }
};
const userRegister = (req, res, next) => {
  try {
    const userSchema = joi.object({
      name: joi.string().min(3).required(),
      email: joi.string().email().required(),
      password: joi
        .string()
        .min(8)
        .required()
        .pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
        )
        .messages({
          "string.pattern.base":
            "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character.",
          "string.empty": "Password cannot be empty",
        }),
      passwordRepeat: joi
        .string()
        .required()
        .valid(joi.ref("password"))
        .messages({
          "string.empty": "Password cannot be empty",
          "any.only":
            "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character.",
        }),
    });
    const { error } = userSchema.validate(req.body);
    if (error) throw error;
    next();
  } catch (error) {
    if (typeof error === joi.ValidationError) {
      const errorMessage = error.details.map((e) => e.message).join(", ");
      res.status(400).json(errorMessage);
    }
    res.status(400).json(JSON.parse(error.message));
  }
};
module.exports = {
  userLogin,
  userRegister,
};
