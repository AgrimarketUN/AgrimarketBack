import express from "express";

import storeController from "@/controllers/store.controller";
import asyncErrorMiddleware from "@/middlewares/asyncError.middleware";
import authMiddleware from "@/middlewares/auth.middleware";

const router = express.Router();

router.get("/get", asyncErrorMiddleware(storeController.getStores));
router.post("/create", authMiddleware, asyncErrorMiddleware(storeController.createStore));
//router.post("/findbyname", asyncErrorMiddleware(storeController.findStoreByName))
//router.post("/findbydescription", asyncErrorMiddleware(storeController.findStoreByDescription))")
//router.put("/update/:id", asyncErrorMiddleware(storeController.updateStore))
//router.delete("/delete/:id", asyncErrorMiddleware(storeController.deleteStore))

export default router;
