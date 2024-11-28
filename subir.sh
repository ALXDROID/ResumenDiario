#!/bin/bash

# Nombre del repositorio en GitHub Desktop
REPO_NAME="NombreDelRepositorio"

# Ruta al repositorio en tu computadora
REPO_PATH="$HOME/Documents/GitHub/$REPO_NAME" # Ajusta la ruta según tu configuración

# Mensaje de commit
COMMIT_MESSAGE="Actualización del proyecto $(date '+%Y-%m-%d %H:%M:%S')"

# Cambiar al directorio del repositorio
cd "$REPO_PATH" || { echo "No se pudo acceder al repositorio"; exit 1; }

# Agregar cambios
git add .

# Crear commit
git commit -m "$COMMIT_MESSAGE"

# Subir cambios
git push origin main # Asegúrate de que tu rama principal se llama "main"
