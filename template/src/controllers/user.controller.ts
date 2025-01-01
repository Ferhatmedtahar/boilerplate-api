import { NextFunction, Request, Response } from "express";

import multer from "multer";

import sharp from "sharp";

import { User } from "../models/user.model";
import { APIFeatures } from "../utils/APIfeatures";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

interface CustomReq extends Request {
  user?: any;
}

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = new APIFeatures(User.find(), req.query)
      .filter()
      .sort()
      .fields()
      .paginate();

    const users = await query.query;
    if (!users) return next(new AppError("users not found!", 404));

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  }
);
export async function getUser(req: Request, res: Response, next: NextFunction) {
  const user = await User.findById(req.params.id)
    .populate({
      path: "reviews",
      select: "content rating product -user",
    })
    .populate({
      path: "orders",
      select:
        "isPaid customerContact products state adress deliveryType status",
    });

  if (!user) return next(new AppError("user not found!", 404));
  res.status(200).json({
    status: "success",
    user,
  });
}

export const updateUser = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updatedUser)
      return next(new AppError("user could not be updated ADMIN ", 404));

    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
      },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser)
      return next(new AppError("user could not be deleted ADMIN ", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export function createUser(req: Request, res: Response, next: NextFunction) {
  res.status(200).json({
    message: "this route are not implemented , please sign up ",
  });
}

/*













*/
// REVIEW UPDATE THE USER DATA:name , email

export const updateMe = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    if (req.file) req.body.photo = req.file.filename;

    const { name, email, photo } = req.body;

    if (req.body.password || req.body.passwordConfirm)
      return next(
        new AppError(
          "this route is not for password updates , please use /updatePassword",
          400
        )
      );

    // update only the field i want

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        photo,
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return next(new AppError("user could not be updated ", 404));

    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
      },
    });
  }
);

// REVIEW DELETE USER , set active :false

export const deleteMe = catchAsync(
  async (req: CustomReq, res: Response, next: NextFunction) => {
    if (req.body.password || req.body.passwordConfirm)
      return next(
        new AppError(
          "this route is not for password updates , please use /updatePassword",
          400
        )
      );
    if (req.body.name || req.body.email)
      return next(
        new AppError(
          "this route is not for updating user information , please use /updateMe",
          400
        )
      );
    // update only active field
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        active: false,
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser)
      return next(new AppError("user could not be updated ", 404));

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const getMe = (req: CustomReq, res: Response, next: NextFunction) => {
  req.params.id = req.user._id;
  next();
};

const multerStrorage = multer.memoryStorage();
// const multerFilter = (req: Request, file: any, cb: any) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image!, please upload only Images.", 400), false);
//   }
// };

// const upload = multer({ storage: multerStrorage, fileFilter: multerFilter });
// export const uploadUserPhoto = upload.single("photo");

// export const resizeUserPhoto = catchAsync(
//   async (req: CustomReq, res: Response, next: NextFunction) => {
//     if (!req.file) return next();
//     //  redefine the filename bcs we removed the storage from disk to memory to process the images before its saved
//     req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
//     // sharp
//     await sharp(req.file.buffer)
//       .resize(500, 500)
//       .toFormat("jpeg")
//       .jpeg({ quality: 90 })
//       .toFile(`src/public/img/users/${req.file.filename}`);
//     //  write in in a file in our disk
//     next();
//   }
// );
