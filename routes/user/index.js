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
  {
    path: '/file-upload',
    method: 'post',
    options: {
      payload: {
        output: 'stream',
        multipart: true
      },
      handler: User.emp_file_upload,
      description: "File upload",
      notes: 'file-upload',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          payloadType: 'form'
        }
      },
      validate: {
        payload: Joi.object({
          file: Joi.any()
            .meta({ swaggerType: 'file' })
            .description('file')
        })
      },
    }
  }
]

module.exports = router;