export const productSwagger = {
  //  REVIEW PRODUCTS :

  "/products": {
    get: {
      tags: ["Product"],
      summary: "Get products ",
      description:
        "Fetches all products for a specific user with support for filtering, sorting, field limiting, and pagination.",
      parameters: [
        {
          name: "seller",
          in: "query",
          required: true,
          schema: {
            type: "string",
          },
          description: "The ID of the seller to retrieve products for.",
        },
        {
          name: "sort",
          in: "query",
          required: false,
          schema: {
            type: "string",
            example: "price,-name",
          },
          description:
            "Sorting fields. Use `-` for descending order, e.g., `sort=price,-name`.",
        },
        {
          name: "filter",
          in: "query",
          required: false,
          schema: {
            type: "number",
            example: "stock[gte]=20       price[lte]=1000",
          },
          description:
            "Filter products using fields from the schema with the needed operator and specified value.",
        },
        {
          name: "fields",
          in: "query",
          required: false,
          schema: {
            type: "string",
            example: "name,price,description",
          },
          description:
            "Limit the fields returned, e.g., `fields=name,price,description`.",
        },
        {
          name: "page",
          in: "query",
          required: false,
          schema: {
            type: "number",
          },
          description: "Page number for pagination.",
        },
        {
          name: "limit",
          in: "query",
          required: false,
          schema: {
            type: "number",
          },
          description: "Number of products per page for pagination.",
        },
      ],
      responses: {
        "200": {
          description: "List of products successfully retrieved",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  results: { type: "number" },
                  data: {
                    type: "object",
                    properties: {
                      products: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            _id: { type: "string" },
                            seller: { type: "string" },
                            name: { type: "string" },
                            description: { type: "string" },
                            price: { type: "number" },
                            stock: { type: "number" },
                            category: { type: "string" },
                            images: {
                              type: "array",
                              items: { type: "string", format: "uri" },
                            },
                            isAvailable: { type: "boolean" },
                            orders: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  _id: { type: "string" },
                                  customerName: { type: "string" },
                                  customerContact: { type: "string" },
                                  state: { type: "string" },
                                  adress: { type: "string" },
                                  deliveryType: { type: "string" },
                                  totalAmount: { type: "number" },
                                  status: { type: "string" },
                                },
                              },
                            },
                            createdAt: {
                              type: "string",
                              format: "date-time",
                            },
                            updatedAt: {
                              type: "string",
                              format: "date-time",
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              example: {
                status: "success",
                results: 6,
                data: {
                  products: [
                    {
                      _id: "66e4bdb5563a12be20b0efe7",
                      seller: "66e4b4348e87d20ed4127c69",
                      name: "pencils",
                      description: "write in copy books with smile.",
                      price: 10,
                      stock: 0,
                      category: "Fitness",
                      images: [],
                      isAvailable: false,
                      orders: [],
                      createdAt: "2024-09-13T22:33:25.031Z",
                      updatedAt: "2024-09-13T22:33:25.031Z",
                    },
                    // More products...
                  ],
                },
              },
            },
          },
        },
        "404": {
          description: "there are no products found",
        },
      },
    },

    post: {
      tags: ["Product"],
      summary: "Create a new product",
      description: "Creates a new product with the provided details.",
      requestBody: {
        description: "Product object that needs to be added.",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                sellerId: {
                  type: "string",
                  description: "ID of the seller",
                },
                name: {
                  type: "string",
                  description: "Name of the product",
                },
                description: {
                  type: "string",
                  description: "Description of the product",
                },
                price: {
                  type: "number",
                  description: "Price of the product",
                },
                stock: {
                  type: "number",
                  description: "Available stock for the product",
                },
                category: {
                  type: "string",
                  description: "Category of the product",
                },
                images: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "uri",
                    description: "URL of the product image",
                  },
                  description: "Array of product image URLs",
                },
              },
              required: ["sellerId", "name", "price", "stock"],
            },
            example: {
              sellerId: "66e0a87bfa5df4025c80e626",
              name: "dumbells",
              description: "get stronger ",
              price: 10,
              stock: 20,
              category: "Fitness",
            },
          },
        },
      },
      responses: {
        "201": {
          description: "Product successfully created",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: { type: "string" },
                  data: {
                    type: "object",
                    properties: {
                      product: {
                        type: "object",
                        properties: {
                          _id: { type: "string" },
                          seller: { type: "string" },
                          name: { type: "string" },
                          description: { type: "string" },
                          price: { type: "number" },
                          stock: { type: "number" },
                          category: { type: "string" },
                          images: {
                            type: "array",
                            items: {
                              type: "string",
                              format: "uri",
                            },
                          },
                          isAvailable: { type: "boolean" },
                          orders: {
                            type: "array",
                            items: { type: "object" },
                          },
                          createdAt: { type: "string", format: "date-time" },
                          updatedAt: { type: "string", format: "date-time" },
                          __v: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
              examples: {
                "application/json": {
                  value: {
                    status: "success",
                    data: {
                      product: {
                        _id: "66e4bdb5563a12be20b0efe7",
                        seller: "66e4b4348e87d20ed4127c69",
                        name: "pencils",
                        description: "write in copy books with smile  .",
                        price: 10,
                        stock: 0,
                        category: "Fitness",
                        images: [],
                        isAvailable: false,
                        orders: [],
                        createdAt: "2024-09-13T22:33:25.031Z",
                        updatedAt: "2024-09-13T22:33:25.031Z",
                        __v: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "product could not be created! , please try later.",
        },
      },
    },
  },

  //  *get product
  "/products/{id}": {
    get: {
      tags: ["Product"],
      summary: "Get product by ID",
      description: "Retrieve product details by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "200": {
          description: "Product details retrieved",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "success",
                  },
                  data: {
                    type: "object",
                    properties: {
                      product: {
                        type: "object",
                        properties: {
                          _id: {
                            type: "string",
                            example: "66e4bdb5563a12be20b0efe7",
                          },
                          seller: {
                            type: "string",
                            example: "66e4b4348e87d20ed4127c69",
                          },
                          name: {
                            type: "string",
                            example: "pencils",
                          },
                          description: {
                            type: "string",
                            example: "write in copy books with smile .",
                          },
                          price: {
                            type: "number",
                            example: 10,
                          },
                          stock: {
                            type: "number",
                            example: 0,
                          },
                          category: {
                            type: "string",
                            example: "Fitness",
                          },
                          images: {
                            type: "array",
                            items: {
                              type: "string",
                              format: "uri",
                            },
                            example: [],
                          },
                          isAvailable: {
                            type: "boolean",
                            example: false,
                          },
                          orders: {
                            type: "array",
                            items: {
                              type: "string",
                            },
                            example: [],
                          },
                          createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-09-13T22:33:25.031Z",
                          },
                          updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2024-09-13T22:33:25.031Z",
                          },
                          __v: {
                            type: "integer",
                            example: 0,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "Product not found",
        },
      },
    },

    //  !update a product
    patch: {
      tags: ["Product"],
      summary: "Update product by ID",
      description: "Update details of a product by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        description: "Product object with updated details.",
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                price: { type: "number" },
                stock: { type: "number" },
                category: { type: "string" },
                images: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "uri",
                  },
                },
              },
              example: {
                name: "pencils",
                description: "write in copy books with smile .",
                price: 10,
                stock: 50,
                category: "Fitness",
                images: [],
              },
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Product successfully updated",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "success",
                  },
                  data: {
                    type: "object",
                    properties: {
                      _id: {
                        type: "string",
                        example: "66e4bdb5563a12be20b0efe7",
                      },
                      seller: {
                        type: "string",
                        example: "66e4b4348e87d20ed4127c69",
                      },
                      name: {
                        type: "string",
                        example: "pencils",
                      },
                      description: {
                        type: "string",
                        example: "write in copy books with smile .",
                      },
                      price: {
                        type: "number",
                        example: 10,
                      },
                      stock: {
                        type: "number",
                        example: 50,
                      },
                      category: {
                        type: "string",
                        example: "Fitness",
                      },
                      images: {
                        type: "array",
                        items: {
                          type: "string",
                          format: "uri",
                        },
                        example: [],
                      },
                      isAvailable: {
                        type: "boolean",
                        example: true,
                      },
                      orders: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                        example: [],
                      },
                      createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-09-13T22:33:25.031Z",
                      },
                      updatedAt: {
                        type: "string",
                        format: "date-time",
                        example: "2024-09-14T11:31:52.902Z",
                      },
                      __v: {
                        type: "integer",
                        example: 0,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "404": {
          description: "product could not be updated",
        },
      },
    },

    //  *delete a product
    delete: {
      tags: ["Product"],
      summary: "Delete product by ID",
      description: "Delete a product by ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        "204": {
          description: "Product successfully deleted",
        },
        "404": {
          description: "Product not found",
        },
      },
    },
  },
};
