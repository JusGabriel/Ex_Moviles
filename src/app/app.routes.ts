import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'splash', loadComponent: () => import('./pages/splash/splash.page').then(m => m.SplashPage) },
  { path: 'onboarding', loadComponent: () => import('./pages/onboarding/onboarding.page').then(m => m.OnboardingPage) },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage) },

  // Planes
  { path: 'planes-list', loadComponent: () => import('./features/planes/planes-list/planes-list.page').then(m => m.PlanesListPage) },
  { path: 'planes-detail/:id', loadComponent: () => import('./features/planes/planes-detail/planes-detail.page').then(m => m.PlanesDetailPage) },
  { path: 'planes-create-edit/:id?', loadComponent: () => import('./features/planes/planes-create-edit/planes-create-edit.page').then(m => m.PlanesCreateEditPage) },

  // Contrataciones
  { path: 'mis-contrataciones', loadComponent: () => import('./features/contrataciones/mis-contrataciones/mis-contrataciones.page').then(m => m.MisContratacionesPage) },
  { path: 'lista-contrataciones', loadComponent: () => import('./features/contrataciones/lista-contrataciones/lista-contrataciones.page').then(m => m.ListaContratacionesPage) },

  // Chat
  { path: 'chat-list', loadComponent: () => import('./features/chat/chat-list/chat-list.page').then(m => m.ChatListPage) },
  { path: 'chat-room/:id_contratacion', loadComponent: () => import('./features/chat/chat-room/chat-room.page').then(m => m.ChatRoomPage) },

  // Home Usuario modular
  {
    path: 'home-usuario',
    loadComponent: () => import('./features/perfil/home-usuario/home-usuario.page').then(m => m.HomeUsuarioPage),
    children: [
      { path: '', redirectTo: 'perfil', pathMatch: 'full' }, // default
      { path: 'inicio', loadComponent: () => import('./features/planes/planes-list/planes-list.page').then(m => m.PlanesListPage) },
      { path: 'mis-planes', loadComponent: () => import('./features/contrataciones/mis-contrataciones/mis-contrataciones.page').then(m => m.MisContratacionesPage) },
      { path: 'chat', loadComponent: () => import('./features/chat/chat-room/chat-room.page').then(m => m.ChatRoomPage) },
      { path: 'perfil', loadComponent: () => import('./features/perfil/usuario-perfil/usuario-perfil.page').then(m => m.UsuarioPerfilPage) },
    ]
  },

  // Home Asesor modular
  {
    path: 'home-asesor',
    loadComponent: () => import('./features/perfil/home-asesor/home-asesor.page').then(m => m.HomeAsesorPage),
    children: [
      { path: '', redirectTo: 'perfil', pathMatch: 'full' }, // default
      { path: 'perfil', loadComponent: () => import('./features/perfil/asesor-perfil/asesor-perfil.page').then(m => m.AsesorPerfilPage) },
      { path: 'planes-create', loadComponent: () => import('./features/planes/planes-create-edit/planes-create-edit.page').then(m => m.PlanesCreateEditPage) },
      { path: 'chat', loadComponent: () => import('./features/chat/chat-room/chat-room.page').then(m => m.ChatRoomPage) },
      { path: 'lista-contrataciones', loadComponent: () => import('./features/contrataciones/lista-contrataciones/lista-contrataciones.page').then(m => m.ListaContratacionesPage) },
    ]
  }
];
