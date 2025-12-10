// company-profile-app/backend/src/routes/auth.routes.ts

import { Router } from 'express';
// Ganti dengan fungsi controller autentikasi yang sebenarnya dari auth.controller.ts
const authRoutes = Router();

// Endpoint placeholder
authRoutes.post('/register', (req, res) => res.json({ message: 'Register placeholder' }));
authRoutes.post('/login', (req, res) => res.json({ message: 'Login placeholder' }));
authRoutes.post('/logout', (req, res) => res.json({ message: 'Logout placeholder' }));

export default authRoutes;