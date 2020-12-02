import Auth from "../../middlewares/authMiddleware.js";
import { isAdmin } from "../../middlewares/authMiddleware.js";
import * as userControllers from "../../controllers/adminControllers/adminUsers.js";
import express from "express";

const router = express.Router();

router.route("/").get(Auth, isAdmin, userControllers.getUsers);
router
  .route("/:id")
  .delete(Auth, isAdmin, userControllers.deleteUser)
  .get(Auth, isAdmin, userControllers.getUser)
  .put(Auth, isAdmin, userControllers.editUser);

export default router;
