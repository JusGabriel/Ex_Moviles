# Examen de Aplicaciones Móviles

El proyecto consiste en una plataforma móvil desarrollada con Ionic + Angular que permite a los usuarios visualizar, contratar y gestionar planes móviles. Además, incluye un sistema de chat en tiempo real para que los clientes puedan comunicarse con un asesor asignado a su contratación.
Supabase se utiliza como backend principal para autenticación, base de datos, RLS, API y eventos en tiempo real.

# 2. Funcionalidades Implementadas
## 2.1 Autenticación de Usuarios

Registro e inicio de sesión con Supabase Auth.
Manejo seguro del token y persistencia del estado del usuario.
Metadatos para diferenciar roles como cliente y asesor.

## 2.2 Gestión de Planes Móviles

* Creación de tabla planes_moviles.
* Consulta desde Ionic mediante Supabase.
* Vista para mostrar los planes y detalle de cada uno.

## 2.3 Sistema de Contrataciones

Tabla contrataciones con relación a usuarios y planes.
RLS configurado para que:
* El usuario solo vea sus propias contrataciones.
* El asesor pueda ver solo las asignadas.

## 2.4 Chat en Tiempo Real

Tabla mensajes_chat para registrar mensajes por contratación.
Servicio de chat en Angular:
* Envío de mensajes a Supabase.
* Suscripción en tiempo real usando postgres_changes.
* Historial de mensajes ordenados por fecha.
* Pantalla de chat para cliente y asesor.

## 2.5 Asignación de Asesores

* Tabla asesores enlazada a planes_moviles.
* Configuración SQL para relacionar cada contratación con un asesor.
* Creación de usuarios asesores en Supabase Auth.

# 3. Integraciones Técnicas Principales

Supabase:

* Auth (usuarios y roles)
* PostgreSQL (base de datos)
* Row Level Security

