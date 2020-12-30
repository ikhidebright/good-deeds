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

router.post('/roles', Authenticate, Permit('roles.manage'), createRole);
router.get('/permissions', Authenticate, Permit('roles.view'), getPermissions);
router.get('/roles', Authenticate, Permit('roles.view'), getRoles);
router.put('/role/:id', Authenticate, Permit('roles.manage'), editRole);
router.delete('/role/:id', Authenticate, Permit('roles.manage'), deleteRole);
router.get('/role/:id', Authenticate, Permit('roles.view'), getRole);

export default router;