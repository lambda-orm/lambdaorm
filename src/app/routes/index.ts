import express from "express";
import PingController from "../controllers/ping";
import SchemaController from "../controllers/schema";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.post("/schema", async (req, res) => {
  const controller = new SchemaController();
  await controller.post(req.body);
  return res.send();
});

export default router;