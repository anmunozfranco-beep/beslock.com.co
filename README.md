# Levantar entorno WordPress con Docker

Este repositorio contiene el tema `beslock-custom`. Los siguientes archivos configuran un contenedor de WordPress y una base de datos MySQL locales.

Archivos creados:

- `docker-compose.yml` — define servicios `wordpress` y `db`.
- `.env` — variables de entorno (credenciales y puerto).

Instrucciones rápidas:

1. Asegúrate de tener Docker instalado y el plugin `docker compose` disponible.

2. Revisa y, si quieres, edita las credenciales en `.env`.

3. Levantar los servicios:

```bash
cd /path/to/repo
docker compose up -d
```

4. Abre el sitio en: `http://localhost:8000` (o el puerto que tengas en `WP_PORT`).

5. Archivos locales montados dentro del contenedor:

- El contenido del repositorio se monta en el tema `beslock-custom` dentro de WordPress, de modo que puedes editar los archivos del tema en tu máquina y ver los cambios en caliente.
- La carpeta `wp-uploads` se usa para contenidos subidos.

Para detener y eliminar contenedores y volúmenes asociados:

```bash
docker compose down -v
```

Si quieres, puedo ejecutar `docker compose up -d` ahora y levantar el sitio local. ¿Lo ejecuto? 
