# AURUM NOVA â€” Web PÃºblica

Sitio web corporativo y plataforma pÃºblica de **Aurum Nova**, firma especializada en ingenierÃ­a de inteligencia artificial aplicada a ventas y automatizaciÃ³n comercial.

- **ProducciÃ³n:** [https://aurumnova.github.io/aurum-nova/](https://aurumnova.github.io/aurum-nova/)
- **Repositorio:** `aurumnova/aurum-nova` (rama `main`)

---

## 1. Estructura del Proyecto

```text
aurum-nova/
â”œâ”€â”€ index.html              # Landing corporativa principal y perfil ejecutivo
â”œâ”€â”€ aurumpitch.html         # PresentaciÃ³n comercial / deck interactivo
â”œâ”€â”€ blog/                   # Hub de artÃ­culos y publicaciones tÃ©cnicas
â”‚   â”œâ”€â”€ index.html          # Ãndice del blog
â”‚   â””â”€â”€ *.html              # ArtÃ­culos tÃ©cnicos
â”œâ”€â”€ assets/                 # Recursos visuales (logotipos, retratos, branding)
â”œâ”€â”€ .github/workflows/      # AutomatizaciÃ³n CI/CD (GitHub Actions)
â”œâ”€â”€ .gitignore              # ProtecciÃ³n de entorno local y tooling
â”œâ”€â”€ AGENTS.md               # Contrato operativo para agentes de IA
â””â”€â”€ README.md               # Esta documentaciÃ³n
```

---

## 2. Gobernanza y Fuente de Verdad

Este repositorio forma parte del ecosistema operativo de Aurum Nova:

- **Gobernanza Central:** Reside en el directorio institucional `01_GOVERNANCE/` del workspace (`00_CORE`, `02_ARCHITECTURE`, `03_AGENTS`, `04_OPERATIONS`, `11_SECURITY`).
- **Contrato de Agentes:** Consulta [`AGENTS.md`](AGENTS.md) para conocer la jerarquÃ­a de autoridad, roles multiagente y reglas inquebrantables de desarrollo y release.

---

## 3. ValidaciÃ³n y Calidad (CI/CD)

### IntegraciÃ³n Continua (GitHub Actions)
El workflow [`.github/workflows/aurum-nova-ci-minimal.yml`](.github/workflows/aurum-nova-ci-minimal.yml) se ejecuta automÃ¡ticamente en cada `push` o `pull_request` a `main`:
- Valida la integridad estructural de archivos y carpetas (`assets/`, `blog/`).
- Ejecuta una comprobaciÃ³n exhaustiva de todas las referencias locales relativas (`href`, `src`) y anclas/IDs (`#fragment`).

### ValidaciÃ³n Local
Para reproducir la comprobaciÃ³n del CI de forma local antes de commits:
```bash
# Validar estructura y enlaces locales
python -c "import urllib.request; ..." # Ejecutar el script validador del CI
```
Las auditorÃ­as visuales y de interacciÃ³n responsiva se validan con la suite Playwright sobre 6 viewports (`375Ã—812`, `390Ã—844`, `768Ã—1024`, `900Ã—1200`, `1024Ã—900`, `1440Ã—900`), garantizando `0px` de overflow horizontal y cero errores de consola.

### Despliegue (GitHub Pages)
El despliegue a producciÃ³n se realiza automÃ¡ticamente mediante el runner dinÃ¡mico de GitHub Pages al integrarse cambios validados en `main`.
