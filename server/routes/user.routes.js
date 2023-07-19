import express from "express";
import userController from "./../controllers/user.controller";

const router = express.Router();

router.route("/api/users").get(userController.list).post(userController.create);

router
  .route("/api/users/:usersId")
  .get(userController.read)
  .put(userController.update)
  .delete(userController.remove);

router.param("userId", userController.userById);

export default router;
