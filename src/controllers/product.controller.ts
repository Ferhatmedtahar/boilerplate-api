import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import { Product } from "../models/product.model";
import { APIFeatures } from "../utils/APIfeatures";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

interface CustomReq extends Request {
  user?: any;
}

const multerStrorage = multer.memoryStorage();
const multerFilter = (req: Request, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image!, please upload only Images.", 400), false);
  }
};

const upload = multer({ storage: multerStrorage, fileFilter: multerFilter });
export const uploadProductImages = upload.array("images", 3);

//  !resize the user photo

export const resizeProductImages = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    if (!req.files) return next();

    req.body.images = [];
    // Ensure req.files is an array
    const files = req.files as Express.Multer.File[];

    await Promise.all(
      files.map(async (file: any, index: number) => {
        const fileName = `product-${req.user._id}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(file.buffer)
          .resize(800, 800)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`src/public/img/products/${fileName}`);

        req.body.images.push(fileName);
      })
    );
    next();
  }
);
/*

      !saving product images 
$
^
|
£CRUD PRODUCT OP
    ! get all products
*/

//  $ top 5 products
export const aliasTopProducts = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.query = {
    limit: "5",
    sort: "-ratingAverage,price",
    fields: "name,price,ratingAverage,summary,difficulty",
  };
  next();
};

//   get stats about the products
export const getProductStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          numProducts: { $sum: 1 },
          numRating: { $sum: "$ratingQuantity" },
          averageRating: { $avg: "$ratingAverage" },
          averagePrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: {
          averagePrice: 1,
        },
      },
    ]);

    if (!stats) return next(new AppError("could not get this statistics", 404));
    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  }
);

export const getAllProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = new APIFeatures(Product.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();

    const products = await query.query;
    if (!products) return next(new AppError("no products found!", 404));

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    });
  }
);

// £ get one product

export const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.id).populate("reviews");
    if (!product) {
      return next(new AppError("product not found ", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  }
);

// $ create one product
export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      category,
      description,
      summary,
      usage,
      price,
      discount,
      stock,
      images,
    } = req.body;

    const newProduct = await Product.create({
      name,
      category,
      description,
      summary,
      usage,
      price,
      discount,
      stock,
      images,
    });
    if (!newProduct) {
      return next(new AppError("could not be created", 400));
    }
    res.status(201).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  }
);

// * update one product

export const updateProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      category,
      description,
      summary,
      usage,
      price,
      discount,
      stock,
      images,
    } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        description,
        summary,
        usage,
        price,
        discount,
        stock,
        images,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!updatedProduct) {
      return next(new AppError("could not be created", 400));
    }
    res.status(200).json({
      status: "success",
      data: {
        updatedProduct,
      },
    });
  }
);

// ! delete one product

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return next(new AppError("could not be deleted", 404));
    res.status(204).json({
      message: "success",
    });
  }
);
