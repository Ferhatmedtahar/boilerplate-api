export const authSwagger = {
  "/users/signUp": {
    post: {
      tags: ["auth"],
      summary: "register a new user",
      description: "register a new user with the provided details.",
      requestBody: {
        description: "User object that needs to be added.",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string", format: "email" },
                password: { type: "string" },
                passwordConfirm: { type: "string" },
              },
              required: ["name", "email", "password", "passwordConfirm"],
              example: {
                name: "john",
                email: "john@example.com",
                password: "test1234",
                passwordConfirm: "test1234",
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User successfully created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  token: { type: "string" },

                  data: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          email: { type: "string", format: "email" },
                          role: { type: "string" },
                          active: { type: "boolean" },
                          photo: { type: "string" },
                          _id: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                          updatedAt: { type: "string", format: "date-time" },
                          __v: { type: "integer" },
                          id: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                status: "success",
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjdlMTEzYjZlYjY3OTMyMmQ2MzdiMSIsImlhdCI6MTcyNzUyMTA0NiwiZXhwIjoxNzMwMTEzMDQ2fQ.3iucHA0Z0jQOGoWF7tznfa1VIbqIwjCW_eyeEKh5KvY",
                data: {
                  user: {
                    name: "john",
                    email: "john@example.com",
                    role: "user",
                    photo: "default.png",
                    active: true,
                    _id: "66f7e113b6eb679322d637b1",
                    __v: 0,
                    id: "66f7e113b6eb679322d637b1",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "user could not be created",
        },
      },
    },
  },

  //   login
  "/users/login": {
    post: {
      tags: ["auth"],
      summary: "login a user",
      description: "login a user with the provided details.",
      requestBody: {
        description: "user information to access his account.",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", format: "email" },
                password: { type: "string" },
              },
              required: ["email", "password"],
              example: {
                email: "john@example.com",
                password: "test1234",
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User successfully created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  token: { type: "string" },

                  data: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          email: { type: "string", format: "email" },
                          role: { type: "string" },
                          _id: { type: "string" },
                          id: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                status: "success",
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjdlMTEzYjZlYjY3OTMyMmQ2MzdiMSIsImlhdCI6MTcyNzUyMTA0NiwiZXhwIjoxNzMwMTEzMDQ2fQ.3iucHA0Z0jQOGoWF7tznfa1VIbqIwjCW_eyeEKh5KvY",
                data: {
                  user: {
                    name: "john",
                    email: "john@example.com",
                    _id: "66f7e113b6eb679322d637b1",
                    id: "66f7e113b6eb679322d637b1",
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Incorrect email or  password!",
        },
      },
    },
  },

  // !forgot password
  "/users/forgotpassword/": {
    post: {
      tags: ["auth"],
      summary: "user send email ",
      description:
        "send reset url token to his email {change password proccess process}",
      requestBody: {
        description: "user recieve an email {valid for 10 min only}",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
              },
              required: ["email"],
              example: {
                email: "john@example.com",
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User successfully created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  message: { type: "string" },
                },
              },
              example: {
                status: "success",
                message: "email sended succfully",
              },
            },
          },
        },
        "400": {
          description: "email not found , please provide a valid email",
        },
      },
    },
  },

  // !reset password
  "/users/resetPassword/:{resetToken}": {
    patch: {
      tags: ["auth"],
      summary: "user reset his password",
      description:
        "send password and confirm password and reset it after he gett redirected to this url from his email {complete the forgotpassword process}",
      requestBody: {
        description:
          "user update the password. url come from the email he recieve {valid for 10 min only}",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                passowrd: { type: "string" },
                passowrdConfirm: { type: "string" },
              },
              required: ["email"],
              example: {
                password: "test12345",
                passwordConfirm: "test12345",
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User successfully created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          email: { type: "string", format: "email" },
                          role: { type: "string" },
                          photo: { type: "string" },
                          _id: { type: "string" },
                          passwordChangedAt: {
                            type: "string",
                            format: "date-time",
                          },
                          __v: { type: "integer" },
                          id: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                status: "success",
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjdlMTEzYjZlYjY3OTMyMmQ2MzdiMSIsImlhdCI6MTcyNzUyMjgxNywiZXhwIjoxNzMwMTE0ODE3fQ.JLCbRjd_B3CXVVSo_arlytJOlGxGwEPKcZyYp4Up5GI",
                data: {
                  user: {
                    _id: "66f7e113b6eb679322d637b1",
                    name: "john",
                    email: "john@example.com",
                    role: "user",
                    photo: "default.png",
                    __v: 0,
                    passwordChangedAt: "2024-09-28T11:26:56.343Z",
                    id: "66f7e113b6eb679322d637b1",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid token or has expired",
        },
      },
    },
  },

  // update Password
  "/users/updatePassword": {
    patch: {
      tags: ["auth"],
      summary: "user reset his password",
      description:
        "send password and confirm password and reset it after he gett redirected to this url from his email {complete the forgotpassword process}",
      requestBody: {
        description:
          "user update the password. url come from the email he recieve {valid for 10 min only}",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                currentPassword: { type: "string" },
                passowrd: { type: "string" },
                passowrdConfirm: { type: "string" },
              },
              required: ["password", "passwordConfirm", "currentPassword"],
              example: {
                currentPassword: "test1234",
                password: "test12345",
                passwordConfirm: "test12345",
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User successfully changed his password",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  token: { type: "string" },

                  data: {
                    type: "object",
                    properties: {
                      user: {
                        type: "object",
                        properties: {
                          _id: { type: "string" },
                          passwordChangedAt: {
                            type: "string",
                            format: "date-time",
                          },
                          id: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                status: "success",
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjdlMTEzYjZlYjY3OTMyMmQ2MzdiMSIsImlhdCI6MTcyNzUyMjgxNywiZXhwIjoxNzMwMTE0ODE3fQ.JLCbRjd_B3CXVVSo_arlytJOlGxGwEPKcZyYp4Up5GI",
                data: {
                  user: {
                    _id: "66f7e113b6eb679322d637b1",
                    name: "john",
                    email: "john@example.com",
                    role: "user",
                    photo: "default.png",
                    __v: 0,
                    passwordChangedAt: "2024-09-28T11:26:56.343Z",
                    id: "66f7e113b6eb679322d637b1",
                  },
                },
              },
            },
          },
        },
        "400": {
          description: "Invalid token or has expired",
        },
      },
    },
  },
};
