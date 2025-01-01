export const userSwagger = {
  "/users": {
    post: {
      tags: ["User"],
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
                name: " your name",
                email: "you@gmail.com",
                password: "test1234",
                passwordConfirm: "test1234",
                role: "seller",

                profileImage: "https://example.com/profile.jpg",
                phoneNumber: "0123456789",
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
                          password: { type: "string" },
                          role: { type: "string" },
                          storeName: { type: "string" },
                          active: { type: "boolean" },
                          facebookId: { type: "string" },
                          accessToken: { type: "string" },
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
                data: {
                  user: {
                    name: "your name",
                    email: "name@gmail.com",
                    password:
                      "$2a$12$9LwLq0UFKrdovsv77vM83OogsjcYBeIepP1d7BoOMKaLszZSkrgEi",
                    role: "seller",
                    storeName: "fashion",
                    active: true,
                    accessToken: "EAAB1A2B3C4D5E6F7G8H9I0J",
                    _id: "66e564ff7ae7ede0def32ffb",
                    createdAt: "2024-09-14T10:27:11.023Z",
                    updatedAt: "2024-09-14T10:27:11.023Z",
                    __v: 0,
                    id: "66e564ff7ae7ede0def32ffb",
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

  //  *get user
  "/users/{id}": {
    get: {
      tags: ["User"],
      summary: "Get user by ID",
      description: "Retrieve user details by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user to retrieve",
        },
      ],
      responses: {
        "200": {
          description: "User details retrieved successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  user: {
                    type: "object",
                    properties: {
                      _id: { type: "string" },
                      name: { type: "string" },
                      email: { type: "string", format: "email" },
                      role: { type: "string" },
                      storeName: { type: "string" },

                      createdAt: { type: "string", format: "date-time" },
                      updatedAt: { type: "string", format: "date-time" },
                      __v: { type: "integer" },
                      products: { type: "array", items: { type: "object" } },
                      orders: { type: "array", items: { type: "object" } },
                      id: { type: "string" },
                    },
                  },
                },
                example: {
                  status: "success",
                  user: {
                    _id: "66e564ff7ae7ede0def32ffb",
                    name: "your name",
                    email: "name@gmail.com",
                    role: "seller",
                    storeName: "fashion",
                    createdAt: "2024-09-14T10:27:11.023Z",
                    updatedAt: "2024-09-14T10:27:11.023Z",
                    __v: 0,
                    products: [],
                    orders: [],
                    id: "66e564ff7ae7ede0def32ffb",
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "User not found",
        },
      },
    },

    //  patch
    patch: {
      tags: ["User"],
      summary: "Update user by ID",
      description: "Update details of a user by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user to update",
        },
      ],
      requestBody: {
        description:
          "User object with updated details. You can update only `name`, `email`, `phoneNumber`, and `profileImage`.",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string", format: "email" },
                phoneNumber: { type: "string" },
                profileImage: { type: "string", format: "uri" },
              },
              example: {
                name: "your name",
                email: "name@gmail.com",
                phoneNumber: "1234567890",
                profileImage: "https://example.com/profile.jpg",
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "User successfully updated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  message: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      updatedUser: {
                        type: "object",
                        properties: {
                          _id: { type: "string" },
                          name: { type: "string" },
                          email: { type: "string", format: "email" },
                          role: { type: "string" },
                          storeName: { type: "string" },
                          facebookId: { type: "string" },
                          accessToken: { type: "string" },
                          createdAt: { type: "string", format: "date-time" },
                          updatedAt: { type: "string", format: "date-time" },
                          __v: { type: "integer" },
                          products: {
                            type: "array",
                            items: { type: "object" },
                          },
                          orders: {
                            type: "array",
                            items: { type: "object" },
                          },
                          id: { type: "string" },
                        },
                      },
                    },
                  },
                },
                example: {
                  status: "success",
                  message: "User updated successfully",
                  data: {
                    updatedUser: {
                      _id: "66e564ff7ae7ede0def32ffb",
                      name: "your name ",
                      email: "name@gmail.com",
                      role: "seller",
                      storeName: "fashion",

                      createdAt: "2024-09-14T10:27:11.023Z",
                      updatedAt: "2024-09-14T10:49:36.745Z",
                      __v: 0,
                      products: [],
                      orders: [],
                      id: "66e564ff7ae7ede0def32ffb",
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "user could not be updated",
        },
      },
    },
    //  !canceling
    delete: {
      tags: ["User"],
      summary: "Deactivate user by ID",
      description:
        "Deactivate a user account by ID, marking the user as inactive instead of fully deleting them.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the user to deactivate",
        },
      ],
      responses: {
        "200": {
          description: "User successfully deactivated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  message: { type: "string" },
                  data: { type: "null" },
                },
                example: {
                  status: "success",
                  message: "User deleted successfully",
                  data: null,
                },
              },
            },
          },
        },
        "404": {
          description: "user could not be deleted",
        },
      },
    },
  },
};
