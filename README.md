# Beslock Custom WordPress Theme

Este es el tema personalizado de WordPress para Beslock.com.co - un sitio web especializado en cerraduras inteligentes y soluciones de seguridad.

## 🚀 Características

- Diseño móvil primero (Mobile-first)
- Arquitectura BEM para CSS
- Integración con GSAP para animaciones
- Optimizado para WordPress

## 📁 Estructura del Proyecto

```
beslock.com.co/
├── functions.php          # Funciones principales del tema
├── style.css             # Estilos principales
├── main.css              # Estilos personalizados
├── main.js               # JavaScript personalizado
├── header.php            # Encabezado del sitio
├── footer.php            # Pie de página
├── front-page.php        # Página de inicio
├── index.php             # Template por defecto
├── hero.php              # Sección hero
├── menu-simple.php       # Menú simple
├── product-card.php      # Tarjeta de producto
├── products-portfolio.php # Portafolio de productos
└── discover.php          # Página de descubrimiento
```

## 🔧 Desarrollo

### Requisitos Previos

- WordPress instalado
- Acceso a Git
- Editor de código (VS Code, Sublime, etc.)

### Instalación

1. Clona este repositorio en tu directorio de temas de WordPress:
```bash
cd wp-content/themes/
git clone https://github.com/anmunozfranco-beep/beslock.com.co.git
```

2. Activa el tema desde el panel de administración de WordPress

## 📝 Cómo Hacer Commits

Para contribuir a este proyecto, sigue estas directrices:

### 1. Configurar Git (Primera vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### 2. Hacer Cambios

1. Verifica el estado de tus archivos:
```bash
git status
```

2. Revisa los cambios que has hecho:
```bash
git diff
```

### 3. Preparar Cambios (Staging)

```bash
# Agregar un archivo específico
git add nombre-del-archivo.php

# Agregar todos los archivos modificados
git add .

# Agregar archivos por tipo
git add *.php
git add *.css
```

### 4. Hacer el Commit

```bash
# Commit con mensaje corto
git commit -m "Descripción breve del cambio"

# Commit con mensaje detallado
git commit -m "Título del cambio" -m "Descripción más detallada de lo que se cambió y por qué"
```

### 5. Subir Cambios (Push)

```bash
# Primera vez (configurar upstream)
git push -u origin nombre-de-tu-rama

# Siguientes veces
git push
```

### Ejemplos de Buenos Mensajes de Commit

✅ **Buenos ejemplos:**
```bash
git commit -m "Añadir sección de productos en la página principal"
git commit -m "Corregir error de responsive en el menú móvil"
git commit -m "Actualizar estilos del footer para mejor contraste"
git commit -m "Optimizar carga de imágenes en product-card.php"
```

❌ **Evitar:**
```bash
git commit -m "cambios"
git commit -m "fix"
git commit -m "actualizacion"
git commit -m "asdf"
```

### Consejos para Commits

1. **Commits frecuentes**: Haz commits pequeños y frecuentes en lugar de uno grande
2. **Mensajes descriptivos**: Describe QUÉ cambió y POR QUÉ
3. **Un propósito por commit**: Cada commit debe tener un solo propósito
4. **Revisa antes de hacer commit**: Usa `git diff` para verificar tus cambios

### Workflow Recomendado

```bash
# 1. Ver el estado actual
git status

# 2. Ver los cambios realizados
git diff

# 3. Agregar archivos al staging
git add archivo-modificado.php

# 4. Verificar qué se va a commitear
git status

# 5. Hacer el commit
git commit -m "Mensaje descriptivo del cambio"

# 6. Subir los cambios
git push
```

## 🌿 Ramas (Branches)

- `main` o `master`: Rama principal (producción)
- `develop`: Rama de desarrollo
- `feature/nombre`: Ramas para nuevas características
- `fix/nombre`: Ramas para correcciones

```bash
# Crear una nueva rama
git checkout -b feature/nueva-funcionalidad

# Cambiar entre ramas
git checkout nombre-de-la-rama

# Ver todas las ramas
git branch -a
```

## 🤝 Contribución

Para más detalles sobre cómo contribuir, consulta [CONTRIBUTING.md](CONTRIBUTING.md).

## 📄 Licencia

Este es un proyecto privado para Beslock.com.co

## 📞 Contacto

Para preguntas o soporte, contacta al equipo de desarrollo de Beslock.

---

**Nota**: Este tema está en desarrollo activo. Para cualquier cambio importante, abre un issue primero para discutir lo que te gustaría cambiar.
