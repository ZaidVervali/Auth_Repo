const {Router} = require("express")
const authRoutes = require("./auth.routes")
const fileRoutes = require("./file.routes")
const router = Router();

router.use("/auth" , authRoutes)
router.use("/file" , fileRoutes)

module.exports = router;