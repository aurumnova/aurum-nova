# AURUM NOVA â€” OPERATIONAL AGENT CONTRACT

**VersiÃ³n:** 1.0.0 (Governance P0)
**Alcance:** Repositorio `02_REPOSITORIES/aurum-nova`
**Estado:** Activo
**Nivel de Gobernanza:** Puente Operativo de Repositorio (Repository Operational Bridge)

---

## 1. Identidad y PropÃ³sito

**Aurum Nova** es una firma de ingenierÃ­a y consultorÃ­a estratÃ©gica especializada en soluciones de automatizaciÃ³n inteligente, arquitecturas de IA para ventas y sistemas digitales de captaciÃ³n B2B y empresarial.

Este documento establece el contrato operativo mÃ­nimo y portable que rige a cualquier agente de inteligencia artificial o desarrollador que opere dentro de este repositorio.

---

## 2. Fuente de Verdad Institucional

1. La fuente de verdad central y primaria del proyecto reside en el directorio de gobernanza del workspace:
   `01_GOVERNANCE/`
   - `00_CORE/AURUM_NOVA_CORE.md` (Identidad, misiÃ³n y arquitectura operativa central)
   - `02_ARCHITECTURE/` (Arquitectura tÃ©cnica, decisiones ADR y flujos de trabajo)
   - `03_AGENTS/` (Especificaciones institucionales de agentes)
   - `04_OPERATIONS/` (Protocolos operativos y SOPs)
   - `11_SECURITY/` (PolÃ­ticas de seguridad y gestiÃ³n de secretos)
2. **Principio de No InvenciÃ³n:** NingÃºn agente debe asumir ni inventar contexto, rutas, arquitectura o decisiones empresariales cuando existe documentaciÃ³n institucional disponible.
3. **Reporte de Divergencias:** Si la documentaciÃ³n y la realidad operacional divergen, el agente **no debe ocultar la discrepancia**: debe reportarla explÃ­citamente y proponer una sincronizaciÃ³n controlada.

---

## 3. JerarquÃ­a de Autoridad

Toda acciÃ³n en este repositorio se sujeta estrictamente a la siguiente cadena de mando:

```text
       CEO / Usuario (Autoridad Humana Suprema)
                          â†“
       Project Governance (01_GOVERNANCE/ - Directrices Institucionales)
                          â†“
       Agent Roles (Contratos y LÃ­mites de EspecializaciÃ³n)
                          â†“
       Repository Rules (CI/CD, EstÃ¡ndares de CÃ³digo, Git Integrity)
                          â†“
       Implementation (EjecuciÃ³n TÃ©cnica Controlada)
```

---

## 4. Matriz de Roles y Responsabilidades de Agentes

| Agente | Rol Operativo | Alcance Principal | LÃ­mites Estrictos |
| :--- | :--- | :--- | :--- |
| **ChatGPT** | Strategic Architect / CTO / Coordinator | DefiniciÃ³n de estrategia tÃ©cnica, arquitectura de alto nivel, descomposiciÃ³n de problemas y coordinaciÃ³n entre agentes. | No ejecuta cambios destructivos ni despliegues directos sin validaciÃ³n. |
| **Hermes** | Orchestrator / Operational Automation | AutomatizaciÃ³n de flujos operativos, orquestaciÃ³n de tareas en background, cron jobs y gestiÃ³n repetitiva. | No redefine arquitectura estratÃ©gica ni polÃ­ticas de seguridad. |
| **Antigravity** | Technical Operations / Frontend Engineering / DevOps / Browser QA | Operaciones tÃ©cnicas controladas, ingenierÃ­a frontend, pipelines CI, automatizaciÃ³n Playwright y auditorÃ­a de runtime en producciÃ³n. | No realiza refactors arquitectÃ³nicos no autorizados ni modificaciones fuera de alcance. |
| **Claude Code** | Software Engineering / Deep Refactoring / Technical Analysis | ImplementaciÃ³n de software complejo, auditorÃ­a tÃ©cnica de cÃ³digo, optimizaciÃ³n estricta y refactorizaciÃ³n guiada. | Debe respetar lÃ­mites de alcance de tareas especÃ­ficas y polÃ­ticas de staging. |
| **Codex** | Independent Verification / Release Gate | Segunda auditorÃ­a imparcial, validaciÃ³n cruzada de gates de release, contraste y verificaciÃ³n de regresiones. | Exclusivamente read-only en auditorÃ­as; no introduce cÃ³digo durante fases de verificaciÃ³n. |
| **Gemini** | Research / External Intelligence | InvestigaciÃ³n de mercado, documentaciÃ³n de librerÃ­as/APIs externas y validaciÃ³n comparativa. | No modifica archivos de producciÃ³n ni toma decisiones de release. |

---

## 5. Reglas Operativas Inquebrantables

1. **Sin Autoridad Unilateral:** NingÃºn agente tiene autoridad unilateral para cambiar la estrategia, identidad, branding, modelo comercial ni arquitectura del proyecto.
2. **AlineaciÃ³n con el Objetivo Superior:** Los agentes deben evitar optimizaciones cosmÃ©ticas o locales de componentes aislados cuando exista un objetivo empresarial o de release superior en curso.
3. **RevisiÃ³n Previa a Cambios Estructurales:** Antes de proponer o ejecutar cambios estructurales, de rutas o de dependencias, es obligatorio consultar los documentos correspondientes en `01_GOVERNANCE/`.
4. **Aislamiento de Tooling Local (`.claude/`):** El directorio `.claude/` (y cualquier herramienta de memoria local como `.remember/`) es tooling de entorno local y **nunca debe entrar en Git**. Debe mantenerse siempre excluido vÃ­a `.gitignore`.
5. **ProhibiciÃ³n de Staging Masivo:** **ESTRICTAMENTE PROHIBIDO** ejecutar `git add .` o `git add -A` para preparar commits o releases. Los archivos a commitear deben especificarse de forma explÃ­cita uno a uno (ej. `git add -- archivo1 archivo2`).
6. **Cumplimiento de Release Gates:** NingÃºn commit puede crearse sin superar todos los gates definidos:
   - `git diff --check` sin errores ni advertencias de formato.
   - CI local validator al 100% (referencias y anclas validadas).
   - Playwright suite pasando al 100% (0px overflow horizontal, 0 errores JavaScript de consola).
   - AuditorÃ­a de contraste y accesibilidad (`prefers-reduced-motion`).
7. **Autoridad de ProducciÃ³n:** El entorno de producciÃ³n (`https://aurumnova.github.io/aurum-nova/`) es la autoridad final sobre si un release realmente funciona. Un CI verde en GitHub Actions no sustituye el Smoke Test y Browser QA en producciÃ³n real.
