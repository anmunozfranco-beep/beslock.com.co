# Guía de Contribución / Contributing Guide

## 🇪🇸 Español

### Cómo Contribuir al Proyecto Beslock

¡Gracias por tu interés en contribuir! Esta guía te ayudará a hacer commits y contribuir efectivamente al proyecto.

### Prerequisitos

1. **Instalar Git**: Si no tienes Git instalado, descárgalo desde [git-scm.com](https://git-scm.com/)
2. **Configurar Git** (solo la primera vez):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### Proceso de Contribución

#### 1. Clonar el Repositorio (Primera vez)

```bash
git clone https://github.com/anmunozfranco-beep/beslock.com.co.git
cd beslock.com.co
```

#### 2. Crear una Rama para tu Trabajo

Es una buena práctica crear una rama para cada nueva funcionalidad o corrección:

```bash
# Crear y cambiar a una nueva rama
git checkout -b feature/descripcion-corta

# Ejemplos:
git checkout -b feature/nuevo-menu
git checkout -b fix/error-responsive
git checkout -b update/estilos-footer
```

#### 3. Hacer Cambios en el Código

Edita los archivos necesarios con tu editor de código preferido.

#### 4. Verificar tus Cambios

```bash
# Ver qué archivos has modificado
git status

# Ver los cambios específicos línea por línea
git diff

# Ver los cambios de un archivo específico
git diff nombre-archivo.php
```

#### 5. Preparar los Archivos (Staging)

```bash
# Agregar un archivo específico
git add functions.php

# Agregar varios archivos
git add header.php footer.php

# Agregar todos los archivos modificados
git add .

# Agregar archivos por extensión
git add *.php
git add *.css
git add *.js
```

#### 6. Hacer el Commit

Un commit guarda tus cambios en el historial de Git:

```bash
# Commit básico
git commit -m "Añadir nueva funcionalidad de menú"

# Commit con descripción detallada
git commit -m "Añadir menú de productos móvil" -m "Se implementó un menú desplegable optimizado para dispositivos móviles que incluye:
- Navegación por categorías
- Animaciones suaves
- Optimización de rendimiento"
```

#### 7. Subir tus Cambios (Push)

```bash
# Primera vez en la rama
git push -u origin feature/descripcion-corta

# Siguientes veces
git push
```

#### 8. Crear un Pull Request

1. Ve a GitHub: https://github.com/anmunozfranco-beep/beslock.com.co
2. Haz clic en "Pull requests" → "New pull request"
3. Selecciona tu rama
4. Describe tus cambios
5. Envía el pull request para revisión

### Estándares de Commits

#### Formato del Mensaje

```
Tipo: Descripción corta (máx 50 caracteres)

Descripción detallada opcional (máx 72 caracteres por línea)
- Punto 1
- Punto 2
```

#### Tipos de Commit

- `feat:` Nueva funcionalidad
- `fix:` Corrección de errores
- `docs:` Cambios en documentación
- `style:` Cambios de formato (espacios, comas, etc.)
- `refactor:` Refactorización de código
- `test:` Añadir o modificar tests
- `chore:` Tareas de mantenimiento

#### Ejemplos de Buenos Commits

```bash
git commit -m "feat: Añadir sección de testimonios en homepage"
git commit -m "fix: Corregir error de carga en menú móvil"
git commit -m "docs: Actualizar README con instrucciones de instalación"
git commit -m "style: Mejorar espaciado en product-card.php"
git commit -m "refactor: Optimizar función de carga de assets"
```

### Comandos Git Útiles

```bash
# Ver historial de commits
git log
git log --oneline

# Ver historial con gráfico
git log --graph --oneline --all

# Deshacer cambios en un archivo (antes de commit)
git checkout -- nombre-archivo.php

# Remover archivo del staging (antes de commit)
git reset nombre-archivo.php

# Ver diferencia entre commits
git diff commit1 commit2

# Ver quién modificó cada línea de un archivo
git blame nombre-archivo.php

# Actualizar tu rama local con los cambios remotos
git pull

# Ver ramas disponibles
git branch -a

# Cambiar a otra rama
git checkout nombre-rama
```

### Flujo de Trabajo Completo - Ejemplo

```bash
# 1. Asegurarse de estar en la rama principal actualizada
git checkout main
git pull

# 2. Crear nueva rama para tu trabajo
git checkout -b feature/nuevo-boton-contacto

# 3. Hacer cambios en los archivos...
# (editar archivos con tu editor)

# 4. Verificar cambios
git status
git diff

# 5. Agregar archivos modificados
git add footer.php
git add main.css

# 6. Hacer commit
git commit -m "feat: Añadir botón de contacto en footer"

# 7. Subir cambios
git push -u origin feature/nuevo-boton-contacto

# 8. Crear Pull Request en GitHub
```

### Solución de Problemas Comunes

#### "No tengo permisos para hacer push"

Asegúrate de tener acceso al repositorio. Contacta al administrador si necesitas permisos.

#### "Mi rama está desactualizada"

```bash
# Actualizar tu rama con los últimos cambios
git checkout main
git pull
git checkout tu-rama
git merge main
```

#### "Cometí un error en mi último commit"

```bash
# Modificar el último commit (antes de hacer push)
git commit --amend -m "Nuevo mensaje corregido"

# Agregar archivos olvidados al último commit
git add archivo-olvidado.php
git commit --amend --no-edit
```

#### "Quiero deshacer mi último commit"

```bash
# Mantener los cambios pero deshacer el commit
git reset --soft HEAD~1

# Deshacer el commit y los cambios
git reset --hard HEAD~1
```

### Mejores Prácticas

1. **Commits pequeños y frecuentes**: Es mejor hacer varios commits pequeños que uno grande
2. **Mensajes descriptivos**: El mensaje debe explicar QUÉ y POR QUÉ
3. **Probar antes de commit**: Asegúrate de que tu código funciona
4. **Revisar antes de push**: Usa `git diff` antes de hacer commit
5. **Mantener el código limpio**: Sigue los estándares de código del proyecto
6. **Documentar cambios importantes**: Actualiza la documentación si es necesario

---

## 🇬🇧 English

### How to Contribute to Beslock Project

Thank you for your interest in contributing! This guide will help you make commits and contribute effectively to the project.

### Prerequisites

1. **Install Git**: If you don't have Git installed, download it from [git-scm.com](https://git-scm.com/)
2. **Configure Git** (first time only):

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### Contribution Process

#### 1. Clone the Repository (First time)

```bash
git clone https://github.com/anmunozfranco-beep/beslock.com.co.git
cd beslock.com.co
```

#### 2. Create a Branch for Your Work

It's good practice to create a branch for each new feature or fix:

```bash
# Create and switch to a new branch
git checkout -b feature/short-description

# Examples:
git checkout -b feature/new-menu
git checkout -b fix/responsive-error
git checkout -b update/footer-styles
```

#### 3. Make Changes to the Code

Edit the necessary files with your preferred code editor.

#### 4. Check Your Changes

```bash
# See which files you've modified
git status

# See specific line-by-line changes
git diff

# See changes for a specific file
git diff filename.php
```

#### 5. Stage Files

```bash
# Add a specific file
git add functions.php

# Add multiple files
git add header.php footer.php

# Add all modified files
git add .

# Add files by extension
git add *.php
git add *.css
git add *.js
```

#### 6. Make the Commit

A commit saves your changes to Git's history:

```bash
# Basic commit
git commit -m "Add new menu functionality"

# Commit with detailed description
git commit -m "Add mobile products menu" -m "Implemented a dropdown menu optimized for mobile devices that includes:
- Category navigation
- Smooth animations
- Performance optimization"
```

#### 7. Push Your Changes

```bash
# First time on the branch
git push -u origin feature/short-description

# Subsequent times
git push
```

#### 8. Create a Pull Request

1. Go to GitHub: https://github.com/anmunozfranco-beep/beslock.com.co
2. Click "Pull requests" → "New pull request"
3. Select your branch
4. Describe your changes
5. Submit the pull request for review

### Commit Standards

#### Message Format

```
Type: Short description (max 50 characters)

Optional detailed description (max 72 characters per line)
- Point 1
- Point 2
```

#### Commit Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting changes (spaces, commas, etc.)
- `refactor:` Code refactoring
- `test:` Add or modify tests
- `chore:` Maintenance tasks

#### Examples of Good Commits

```bash
git commit -m "feat: Add testimonials section to homepage"
git commit -m "fix: Fix loading error in mobile menu"
git commit -m "docs: Update README with installation instructions"
git commit -m "style: Improve spacing in product-card.php"
git commit -m "refactor: Optimize asset loading function"
```

### Useful Git Commands

```bash
# View commit history
git log
git log --oneline

# View history with graph
git log --graph --oneline --all

# Undo changes in a file (before commit)
git checkout -- filename.php

# Remove file from staging (before commit)
git reset filename.php

# See difference between commits
git diff commit1 commit2

# See who modified each line of a file
git blame filename.php

# Update your local branch with remote changes
git pull

# View available branches
git branch -a

# Switch to another branch
git checkout branch-name
```

### Complete Workflow - Example

```bash
# 1. Make sure you're on the updated main branch
git checkout main
git pull

# 2. Create new branch for your work
git checkout -b feature/new-contact-button

# 3. Make changes to files...
# (edit files with your editor)

# 4. Check changes
git status
git diff

# 5. Add modified files
git add footer.php
git add main.css

# 6. Make commit
git commit -m "feat: Add contact button in footer"

# 7. Push changes
git push -u origin feature/new-contact-button

# 8. Create Pull Request on GitHub
```

### Common Problem Solutions

#### "I don't have push permissions"

Make sure you have access to the repository. Contact the administrator if you need permissions.

#### "My branch is out of date"

```bash
# Update your branch with latest changes
git checkout main
git pull
git checkout your-branch
git merge main
```

#### "I made a mistake in my last commit"

```bash
# Modify the last commit (before push)
git commit --amend -m "New corrected message"

# Add forgotten files to last commit
git add forgotten-file.php
git commit --amend --no-edit
```

#### "I want to undo my last commit"

```bash
# Keep changes but undo commit
git reset --soft HEAD~1

# Undo commit and changes
git reset --hard HEAD~1
```

### Best Practices

1. **Small and frequent commits**: Better to make several small commits than one large one
2. **Descriptive messages**: Message should explain WHAT and WHY
3. **Test before commit**: Make sure your code works
4. **Review before push**: Use `git diff` before committing
5. **Keep code clean**: Follow project code standards
6. **Document important changes**: Update documentation if necessary

---

## 🆘 Ayuda Adicional / Additional Help

Si tienes problemas o preguntas:
- Abre un issue en GitHub
- Contacta al equipo de desarrollo
- Revisa la documentación de Git: https://git-scm.com/doc

If you have problems or questions:
- Open an issue on GitHub
- Contact the development team
- Check Git documentation: https://git-scm.com/doc
