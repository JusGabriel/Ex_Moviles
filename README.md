# Examen de Aplicaciones Móviles

El proyecto consiste en una plataforma móvil desarrollada con Ionic + Angular que permite a los usuarios visualizar, contratar y gestionar planes móviles. Además, incluye un sistema de chat en tiempo real para que los clientes puedan comunicarse con un asesor asignado a su contratación.
Supabase se utiliza como backend principal para autenticación, base de datos, RLS, API y eventos en tiempo real.

# 2. Funcionalidades Implementadas
## 2.1 Autenticación de Usuarios

Registro e inicio de sesión con Supabase Auth.
Manejo seguro del token y persistencia del estado del usuario.
Metadatos para diferenciar roles como cliente y asesor.

![17e7d324-4875-43ee-ab6b-2de48b74fadd](https://github.com/user-attachments/assets/4ae9551e-0c6a-42c4-8f15-5af400faf0cb)
![69c00cff-aea0-4ad6-877f-c8331aca1ff5](https://github.com/user-attachments/assets/465e0af8-04cd-482d-8df6-6b1bd935bd68)
![3cbe7a2d-4e26-48c4-a77a-d9a65d5602d5](https://github.com/user-attachments/assets/175005a6-c7a6-4d36-bfbc-863b01d2e493)
![4269f8f9-604b-4039-b89e-1fd04ac61824](https://github.com/user-attachments/assets/a984f8ca-66c3-4bfa-94e2-7244e378aa07)


## 2.2 Gestión de Planes Móviles

* Creación de tabla planes_moviles.
* Consulta desde Ionic mediante Supabase.
* Vista para mostrar los planes y detalle de cada uno.

![aa7a1a4b-d01c-45ad-8829-dd6047a17288](https://github.com/user-attachments/assets/6b5e0373-91ad-40b6-acbb-21695eef2a45)

## 2.3 Sistema de Contrataciones

Tabla contrataciones con relación a usuarios y planes.
RLS configurado para que:
* El usuario solo vea sus propias contrataciones.
* El asesor pueda ver solo las asignadas.

![6168a416-5ffa-49a2-b23e-b0dd006d1e2d](https://github.com/user-attachments/assets/12d1bab9-5587-4bf3-8ad8-20cafe1f513f)

## 2.4 Chat en Tiempo Real

Tabla mensajes_chat para registrar mensajes por contratación.
Servicio de chat en Angular:
* Envío de mensajes a Supabase.
* Suscripción en tiempo real usando postgres_changes.
* Historial de mensajes ordenados por fecha.
* Pantalla de chat para cliente y asesor.

![10f16da6-3987-49a0-8b17-2ebb6793559b](https://github.com/user-attachments/assets/fd2655a8-905c-4a24-881a-fe70c456d718)
![147cd85d-25f7-4756-b6d8-631186056dfe](https://github.com/user-attachments/assets/175caefa-1e05-4cff-86a8-136af0f0e374)

## 2.5 Asignación de Asesores

* Tabla asesores enlazada a planes_moviles.
* Configuración SQL para relacionar cada contratación con un asesor.
* Creación de usuarios asesores en Supabase Auth.

<img width="296" height="315" alt="image" src="https://github.com/user-attachments/assets/31ba3f36-7fa3-441f-b24a-4244c7665ff3" />
<img width="598" height="347" alt="image" src="https://github.com/user-attachments/assets/ab8ba7b4-5cee-4b12-9d95-74490d0c2c1a" />


# 3. Integraciones Técnicas Principales

Supabase:

* Auth (usuarios y roles)
* PostgreSQL (base de datos)
* Row Level Security

<img width="872" height="277" alt="image" src="https://github.com/user-attachments/assets/fe8b63e2-c5a9-4cb2-b151-fb8b74bee66b" />
<img width="887" height="462" alt="image" src="https://github.com/user-attachments/assets/f4d7a880-bfb9-452e-b00b-75a3cc206669" />

