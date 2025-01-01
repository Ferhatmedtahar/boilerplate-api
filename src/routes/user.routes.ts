import express from "express";
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  restrictTO,
  signUp,
  updatePassword,
} from "../controllers/auth.controller";
import {
  createUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getUser,
  // resizeUserPhoto,
  updateMe,
  updateUser,
  // uploadUserPhoto,
} from "../controllers/user.controller";
import { validateRequest } from "../validators/validate";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signUpSchema,
  updateMeSchema,
  updatePasswordSchema,
} from "../validators/user.validator";

const router = express.Router();

// £ login and signup and forget  password functionallity

router.post("/signup", validateRequest(signUpSchema), signUp);
router.post("/login", validateRequest(loginSchema), login);

router.post(
  "/forgotPassword",
  validateRequest(forgotPasswordSchema),
  forgotPassword
);
router.patch(
  "/resetPassword/:resetToken",
  validateRequest(resetPasswordSchema),
  resetPassword
);

// $ all prev routes doesnt requires login but the rest need so :
router.use(protect);

router
  .route("/updatePassword")
  .patch(validateRequest(updatePasswordSchema), updatePassword);
// upload.single("photo")
router.route("/updateMe").patch(
  validateRequest(updateMeSchema),
  // uploadUserPhoto,
  // resizeUserPhoto,
  updateMe
);

router.route("/deleteMe").delete(deleteMe);

router.route("/me").get(getMe, getUser);

//  £ for admin
router.use(restrictTO("admin"));

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .patch(restrictTO("admin"), updateUser)
  .delete(restrictTO("admin"), deleteUser)
  .get(getUser);

export default router;
