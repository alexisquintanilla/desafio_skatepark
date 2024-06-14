import { Router } from "express";
import { skaterController } from "../controllers/skatersController.js";

const router = Router();

router.get('/', skaterController.getLogin)

router.get('/registrar', skaterController.getRegister)

router.put('/update', skaterController.updateSkater)

router.delete('/delete', skaterController.deleteUSer)

router.get('/admin', skaterController.getAdmin)

router.post('/registrar', skaterController.registrar)

router.post('/user', skaterController.login)

export default router;