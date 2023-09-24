const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const {AuthMiddleware} = require("../middleware/index");


router.post("/", eventController.createEvent);

router.put("/:id", AuthMiddleware("admin"), eventController.updateEvent);


router.delete("/:id", AuthMiddleware("admin"), eventController.deleteEvent);


router.get("/", AuthMiddleware("student"), eventController.getAllEvents);

router.get("/:id", AuthMiddleware("student"), eventController.getEventById);

router.get("/book", AuthMiddleware("student"), eventController.bookEvent);

module.exports = router;
