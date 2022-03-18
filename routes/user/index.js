const Joi = require('joi');
const User = require('../../controllers/user');
const router = [
    {
        path: "/user-create",
        method: "post",
        options: {
          handler: User.create_user,
          description: "User created",
          notes: "User creation",
          tags: ["api", "user"],
          validate: {
            payload: Joi.object({
              name: Joi.string().required(),
            }),
          },
        },
      },
]

module.exports = router;