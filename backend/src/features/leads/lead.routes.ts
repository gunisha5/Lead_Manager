import { Router } from 'express';
import * as leadController from './lead.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createLeadSchema, updateLeadSchema, getLeadSchema } from './lead.schema';
import { protect, restrictTo } from '../../middlewares/authMiddleware';
import { UserRole } from '../auth/auth.types';

const router = Router();

// Protect all lead routes
router.use(protect);

router
  .route('/')
  .get(leadController.getAllLeads)
  .post(validateRequest(createLeadSchema), leadController.createLead);

router
  .route('/:id')
  .get(validateRequest(getLeadSchema), leadController.getLeadById)
  .patch(validateRequest(updateLeadSchema), leadController.updateLead)
  .delete(validateRequest(getLeadSchema), restrictTo(UserRole.ADMIN), leadController.deleteLead);

export default router;
