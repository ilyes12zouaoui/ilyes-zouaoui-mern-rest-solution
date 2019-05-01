const router = require("express").Router();

router.get("/");
router.get("/seen");
router.get("/unseen");
router.get("/user/:userId");
router.get("/user/:userId/seen");
router.get("/user/:userId/unseen");
router.get("/:id");

router.post("/admin");
router.post("/doctor");
router.post("/simpleUser");
router.post("/:userId");

router.put("/seen/:id");
router.put("/unseen/:id");

router.delete("/:id");

module.exports = router;
