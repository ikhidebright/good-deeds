import { Router } from 'express';
const router = new Router();
import Role from '../controllers/roles.controller'
import Authenticate from '../middleware/auth'
import Permit from '../middleware/permit'
const { createRole, 
        getRoles,
        editRole,
        deleteRole,
        getRole, getPermissions } = Role

router.post('/roles', Authenticate, createRole);
router.get('/permissions', Authenticate, getPermissions);
router.get('/roles', Authenticate, getRoles);
router.put('/role/:id', Authenticate, editRole);
router.delete('/role/:id', Authenticate, deleteRole);
router.get('/role/:id', Authenticate, getRole);

export default router;