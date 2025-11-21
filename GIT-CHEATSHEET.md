# Git Cheat Sheet - Beslock Project

## 🚀 Quick Start Guide / Guía Rápida

### Basic Workflow / Flujo Básico

```bash
# 1. Check status / Ver estado
git status

# 2. See changes / Ver cambios
git diff

# 3. Add files / Agregar archivos
git add .

# 4. Commit / Hacer commit
git commit -m "mensaje descriptivo"

# 5. Push / Subir cambios
git push
```

---

## 📋 Common Commands / Comandos Comunes

### Configuration / Configuración

```bash
# Set username / Configurar nombre
git config --global user.name "Tu Nombre"

# Set email / Configurar email
git config --global user.email "tu@email.com"

# View config / Ver configuración
git config --list
```

### Working with Changes / Trabajando con Cambios

```bash
# See status / Ver estado
git status

# See changes / Ver cambios
git diff

# See changes for specific file / Ver cambios de un archivo
git diff archivo.php

# Add file / Agregar archivo
git add archivo.php

# Add all files / Agregar todos los archivos
git add .

# Remove from staging / Quitar del staging
git reset archivo.php

# Discard changes / Descartar cambios
git checkout -- archivo.php
```

### Commits

```bash
# Basic commit / Commit básico
git commit -m "mensaje"

# Detailed commit / Commit detallado
git commit -m "título" -m "descripción"

# Amend last commit / Modificar último commit
git commit --amend -m "nuevo mensaje"

# Add to last commit / Agregar al último commit
git add archivo.php
git commit --amend --no-edit
```

### Branches / Ramas

```bash
# List branches / Listar ramas
git branch -a

# Create branch / Crear rama
git branch nombre-rama

# Switch branch / Cambiar de rama
git checkout nombre-rama

# Create and switch / Crear y cambiar
git checkout -b nombre-rama

# Delete branch / Eliminar rama
git branch -d nombre-rama

# Rename branch / Renombrar rama
git branch -m nuevo-nombre
```

### Syncing / Sincronización

```bash
# Fetch changes / Obtener cambios
git fetch

# Pull changes / Descargar cambios
git pull

# Push changes / Subir cambios
git push

# Push new branch / Subir nueva rama
git push -u origin nombre-rama

# Force push (cuidado!) / Push forzado (¡cuidado!)
git push -f
```

### History / Historial

```bash
# View log / Ver historial
git log

# View compact log / Ver historial compacto
git log --oneline

# View graph / Ver gráfico
git log --graph --oneline --all

# View file history / Ver historial de archivo
git log -- archivo.php

# See who changed what / Ver quién cambió qué
git blame archivo.php

# Search in history / Buscar en historial
git log --grep="palabra"
```

### Undoing / Deshacer

```bash
# Undo last commit (keep changes) / Deshacer último commit (mantener cambios)
git reset --soft HEAD~1

# Undo last commit (discard changes) / Deshacer último commit (descartar cambios)
git reset --hard HEAD~1

# Undo specific commit / Deshacer commit específico
git revert <commit-hash>

# Unstage file / Quitar archivo del staging
git reset HEAD archivo.php

# Discard all changes / Descartar todos los cambios
git reset --hard
```

### Stashing / Guardar temporalmente

```bash
# Save current work / Guardar trabajo actual
git stash

# Save with message / Guardar con mensaje
git stash save "mensaje"

# List stashes / Listar guardados
git stash list

# Apply last stash / Aplicar último guardado
git stash apply

# Apply and remove / Aplicar y eliminar
git stash pop

# Remove stash / Eliminar guardado
git stash drop
```

---

## 🎯 Common Scenarios / Escenarios Comunes

### Scenario 1: Add a new feature / Agregar nueva funcionalidad

```bash
git checkout -b feature/nueva-funcionalidad
# ... hacer cambios ...
git add .
git commit -m "feat: Añadir nueva funcionalidad"
git push -u origin feature/nueva-funcionalidad
```

### Scenario 2: Fix a bug / Corregir un error

```bash
git checkout -b fix/corregir-error
# ... hacer correcciones ...
git add .
git commit -m "fix: Corregir error en menú"
git push -u origin fix/corregir-error
```

### Scenario 3: Update documentation / Actualizar documentación

```bash
git checkout -b docs/actualizar-readme
# ... editar README.md ...
git add README.md
git commit -m "docs: Actualizar instrucciones de instalación"
git push -u origin docs/actualizar-readme
```

### Scenario 4: Made a mistake / Cometí un error

```bash
# Before commit / Antes del commit
git checkout -- archivo.php

# After commit, before push / Después del commit, antes del push
git reset --soft HEAD~1
# ... hacer correcciones ...
git add .
git commit -m "mensaje corregido"
```

### Scenario 5: Update your branch / Actualizar tu rama

```bash
git checkout main
git pull
git checkout tu-rama
git merge main
```

---

## 🏷️ Commit Message Guidelines / Guía de Mensajes de Commit

### Format / Formato

```
tipo: Descripción corta (máx 50 caracteres)
```

### Types / Tipos

- `feat:` - New feature / Nueva funcionalidad
- `fix:` - Bug fix / Corrección de error
- `docs:` - Documentation / Documentación
- `style:` - Formatting / Formato
- `refactor:` - Code refactoring / Refactorización
- `test:` - Tests / Pruebas
- `chore:` - Maintenance / Mantenimiento

### Examples / Ejemplos

```bash
✅ git commit -m "feat: Añadir botón de contacto"
✅ git commit -m "fix: Corregir error de responsive"
✅ git commit -m "docs: Actualizar README"
✅ git commit -m "style: Mejorar espaciado en footer"
✅ git commit -m "refactor: Optimizar carga de assets"

❌ git commit -m "cambios"
❌ git commit -m "fix"
❌ git commit -m "actualizacion"
```

---

## 🆘 Help / Ayuda

### Git Help / Ayuda de Git

```bash
# General help / Ayuda general
git help

# Command help / Ayuda de comando
git help commit
git help branch
git help merge
```

### Useful Links / Enlaces Útiles

- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Git Cheat Sheet (PDF): https://education.github.com/git-cheat-sheet-education.pdf
- Interactive Git Tutorial: https://learngitbranching.js.org/

---

## 💡 Tips / Consejos

1. **Commit often** / **Haz commits frecuentemente**
   - Small, frequent commits are better / Los commits pequeños y frecuentes son mejores

2. **Write clear messages** / **Escribe mensajes claros**
   - Explain what and why / Explica qué y por qué

3. **Check before commit** / **Revisa antes de hacer commit**
   - Use `git diff` / Usa `git diff`

4. **Pull before push** / **Pull antes de push**
   - Avoid conflicts / Evita conflictos

5. **Use branches** / **Usa ramas**
   - Keep main stable / Mantén main estable

6. **Test your changes** / **Prueba tus cambios**
   - Before committing / Antes de hacer commit

---

**Remember** / **Recuerda**: When in doubt, `git status` is your friend! / Cuando tengas dudas, ¡`git status` es tu amigo!
