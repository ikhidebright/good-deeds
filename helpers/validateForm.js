import Joi from "joi";
import permissions from '../config/permission'

const userEditSchema = Joi.object({
  username: Joi.string().trim().required().min(3).max(45).empty().lowercase().messages({
    "any.required": "Sorry, username is required",
    "string.empty": "username cannot be an empty field",
    "string.min":
    "username should have a minimum length of 3 and a maximum length of 45",
  }),
  role: Joi.string().required().empty().messages({
    "any.required": "Sorry, username is required",
    "string.empty": "username cannot be an empty field",
  }),
  blocked: Joi.boolean(),
  profilePic: Joi.string(),
  email: Joi.string()
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
    })
});

const authSchema = Joi.object({
  username: Joi.string().trim().required().min(3).max(45).empty().lowercase().messages({
    "any.required": "Sorry, username is required",
    "string.empty": "username cannot be an empty field",
    "string.min":
    "username should have a minimum length of 3 and a maximum length of 45",
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

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .required()
    .empty()
    .messages({
      "any.required": "Sorry, Current password is required",
      "string.empty": "Sorry, Current password cannot be an empty field",
    }),
    newPassword: Joi.string()
    .required()
    .empty()
    .min(5)
    .max(1024)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .messages({
      "any.required": "Sorry, New password is required",
      "string.pattern.base":
      "New password must contain only from a-z or A-Z or 0-9.",
      "string.empty": "Sorry, New password cannot be an empty field",
      "string.min": "New password should have a minimum length of 5",
    }),

    confirmNewPassword: Joi.ref('newPassword'),
  });

const approvalSchema = Joi.object({
    approved: Joi.boolean()
    .required()
    .empty()
    .messages({
      "any.required": "Sorry, approved is required",
      "string.empty": "Sorry, approved cannot be an empty field",
    })
  });

const deedSchema = Joi.object({
    deed: Joi.string().required().min(20).max(400).empty().messages({
      "any.required": "Sorry, deed is required",
      "string.empty": "deed cannot be an empty field",
      "string.min":
      "pleasem deed should have a minimum length of 20",
      "string.max":
      "deed should have a maximum length of 400",
    }),
    name: Joi.string().trim().required().min(3).max(45).empty().lowercase().messages({
      "any.required": "Sorry, name is required",
      "string.empty": "name cannot be an empty field",
      "string.min":
      "name should have a minimum length of 3 and a maximum length of 45",
    }),
    location: Joi.string().required().empty().messages({
      "any.required": "Sorry, location is required",
      "string.empty": "location cannot be empty",
    }),
  
      date: Joi.date()
      .required()
      .empty()
      .messages({
        "any.required": "Sorry, date is required",
        "string.empty": "Sorry, date must be set",
      }),

      description: Joi.string()
      .required()
      .empty()
      .min(10)
      .max(1024)
      .messages({
        "any.required": "Sorry, description is required",
        "string.empty": "Sorry, description cannot be an empty field",
        "string.min": "description should have a minimum length of 10",
        "string.max": "description should have a maximum length of 1024",
      })
  });

  // use this in the bulk emailing schema
let userDetailsForBulkMailing = Joi.object().keys({
  username: Joi.string().trim().required().min(3).max(45).empty().lowercase().messages({
    "any.required": "Sorry, username is required",
    "string.empty": "username cannot be an empty field",
    "string.min":
    "username should have a minimum length of 3 and a maximum length of 45",
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
    })
})

const bulkUserMailSchema = Joi.object({
    subject: Joi.string().trim().lowercase().required().min(3).max(20).empty().messages({
      "any.required": "Sorry, subject is required",
      "string.empty": "subject cannot be an empty field",
      "string.min":
      "please subject should have a minimum length of 3",
      "string.max":
      "subject should have a maximum length of 20",
    }),

    userDetails: Joi.array()
    .items(userDetailsForBulkMailing)
    .required()
    .messages({
      "any.required": "user details are required",
    }),

      message: Joi.string()
      .required()
      .empty()
      .min(10)
      .max(1024)
      .messages({
        "any.required": "Sorry, message is required",
        "string.empty": "Sorry, message cannot be an empty field",
        "string.min": "message should have a minimum length of 10",
        "string.max": "message should have a maximum length of 1024",
      })
  });

const roleSchema = Joi.object({
    name: Joi.string().trim().lowercase().required().min(3).max(20).empty().messages({
      "any.required": "Sorry, Role Name is required",
      "string.empty": "Role Name cannot be an empty field",
      "string.min":
      "Please Role Name should have a minimum length of 3",
      "string.max":
      "Role Name should have a maximum length of 20",
    }),
  
    permission: Joi.array()
      .items(Joi.string()
      .valid(...permissions))
      .required()
      .unique()
      .messages({
        "array.length": `Permissions can not be more than ${permissions.length}`,
        "array.min":
        "Please permission should contain atleast 1 permission",
        "any.required": "Sorry, permission is required",
      }),

      description: Joi.string()
      .required()
      .empty()
      .min(10)
      .max(1024)
      .messages({
        "any.required": "Sorry, description is required",
        "string.empty": "Sorry, description cannot be an empty field",
        "string.min": "description should have a minimum length of 10",
        "string.max": "description should have a maximum length of 1024",
      })
  });

  const randomMailchema = Joi.object({
    name: Joi.string().required().min(3).max(45).empty().messages({
      "any.required": "Sorry, name is required",
      "string.empty": "name cannot be an empty field",
      "string.min":
      "name should have a minimum length of 3",
      "string.max":
      "name should have a maximum length of 45",
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

    myMail: Joi.string()
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
  
      phone: Joi.string()
      .required()
      .min(11)
      .max(11)
      .empty()
      .messages({
        "any.required": "Sorry, phone is required",
        "string.empty": "Sorry, phone cannot be empty",
        "string.min": "phone should have a length of 11",
        "string.max": "phone should have a length of 11",
      }),

      subject: Joi.string()
      .required()
      .empty()
      .min(4)
      .max(20)
      .messages({
        "any.required": "Sorry, subject is required",
        "string.empty": "Sorry, subject cannot be an empty field",
        "string.min": "subject should have a minimum length of 10",
        "string.max": "subject should have a maximum length of 1024",
      }),

      date: Joi.date()
      .required()
      .empty()
      .messages({
        "any.required": "Sorry, date is required",
        "string.empty": "Sorry, date must be set",
      }),

      message: Joi.string()
      .required()
      .empty()
      .min(10)
      .max(1024)
      .messages({
        "any.required": "Sorry, message is required",
        "string.empty": "Sorry, message cannot be an empty field",
        "string.min": "message should have a minimum length of 10",
        "string.max": "message should have a maximum length of 1024",
      })
  });

export { authSchema,
         loginSchema,
         emailSchema,
         passwordSchema,
         deedSchema,
         approvalSchema,
         randomMailchema,
         roleSchema,
         bulkUserMailSchema,
         changePasswordSchema }
