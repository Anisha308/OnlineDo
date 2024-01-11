const router = express.Router();
import express from 'express';
import {adminProtect}    from '../middleware/adminAuthMiddleware.js'

import { authAdmin,blockUser,getAllUsers,getAllInstructors,blockInstructor,verifyInstructor,logoutAdmin,unblockInstructor} from '../controllers/adminController.js'

router.post('/auth', authAdmin)
router.post("/logout", logoutAdmin)


router.get('/userlist', getAllUsers)
router.get('/instructorlist',getAllInstructors)
router.put("/unblock-instructor/:instructorId", unblockInstructor);

router.post('/block-user/:userId',blockUser)
router.post('/block-instructor/:instructorId',blockInstructor)
router.put("/verify-instructor/:instructorId",verifyInstructor);



export default router;