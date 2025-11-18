import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];

  // Obtener usuario desde AUTH SERVICE (con retry y sin locks)
  const user = await authService.getCurrentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  // Obtener rol desde tabla usando AuthService (NO desde supabase directo)
  const usuarioTabla = await authService.getUsuarioTabla();

  if (!usuarioTabla) {
    router.navigate(['/login']);
    return false;
  }

  if (requiredRoles.includes(usuarioTabla.rol)) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
