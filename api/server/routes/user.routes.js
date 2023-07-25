import express from "express";
import userController from "../controllers/user.controller";
import authController from "../controllers/auth.controller";

const router = express.Router();

router.route("/api/users").get(userController.list).post(userController.create);

router.param("userId", userController.userById);

router
  .route("/api/users/:userId")
  .get(authController.requireSignin, userController.read)
  .put(
    authController.requireSignin,
    authController.hasAuthorization,
    userController.update
  )
  .delete(
    authController.signin,
    authController.hasAuthorization,
    userController.remove
  );

export default router;
