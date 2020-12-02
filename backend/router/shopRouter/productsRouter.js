import express from "express";
import * as productsControllers from "../../controllers/shopControllers/productsControllers.js";
import Auth from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(productsControllers.getProducts);
router.get("/discount", productsControllers.getDiscount);

router.get("/info/:id", productsControllers.getInformation);
router.post("/:id/review", Auth, productsControllers.postReview);
router.get("/:id/review", productsControllers.getReviews);
router.route("/:id").get(productsControllers.getProduct);

export default router;
