import Joi from "joi";

const authSchema = Joi.object({
  name: Joi.string().required().min(3).max(45).empty().messages({
    "any.required": "Sorry, name is required",
    "string.empty": "name cannot be an empty field",
    "string.min":
    "name should have a minimum length of 3 and a maximum length of 45",
  }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "co", "io"] },
    })
    .lowercase()
    .min(5)
    .max(100)
    .empty()
    .messages({
      "any.required": "Sorry, email is required",
      "string.empty": "Sorry, Email cannot be an empty field",
      "string.email": "Please enter a valid email",
    }),

  password: Joi.string()
    .required()
    .empty()
    .min(5)
    .max(1024)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .messages({
      "any.required": "Sorry, password is required",
      "string.pattern.base":
      "password must contain only from a-z or A-Z or 0-9.",
      "string.empty": "Sorry, password cannot be an empty field",
      "string.min": "password should have a minimum length of 5",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "co", "io"] },
    })
    .lowercase()
    .min(5)
    .max(100)
    .empty()
    .messages({
      "any.required": "Sorry, email is required",
      "string.empty": "Sorry, Email cannot be an empty field",
      "string.email": "Please enter a valid email",
    }),

  password: Joi.string()
    .required()
    .empty()
    .min(5)
    .max(1024)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .messages({
      "any.required": "Sorry, password is required",
      "string.pattern.base":
      "password must contain only from a-z or A-Z or 0-9.",
      "string.empty": "Sorry, password cannot be an empty field",
      "string.min": "password should have a minimum length of 5",
    })
})

const emailSchema = Joi.object({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "uk", "co", "io"] },
      })
      .lowercase()
      .min(5)
      .max(100)
      .empty()
      .messages({
        "any.required": "Sorry, email is required",
        "string.empty": "Sorry, Email cannot be an empty field",
        "string.email": "Please enter a valid email",
      }),
  });

const passwordSchema = Joi.object({
    password: Joi.string()
    .required()
    .empty()
    .min(5)
    .max(1024)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .messages({
      "any.required": "Sorry, password is required",
      "string.pattern.base":
      "password must contain only from a-z or A-Z or 0-9.",
      "string.empty": "Sorry, password cannot be an empty field",
      "string.min": "password should have a minimum length of 5",
    }),

    confirm_password: Joi.ref('password'),
  });

export { authSchema, loginSchema, emailSchema, passwordSchema }
