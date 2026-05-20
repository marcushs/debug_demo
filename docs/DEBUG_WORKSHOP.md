# Debugger workshop script

## Objectif

Apprendre une methode de diagnostic reproductible (breakpoint -> observation -> hypothese -> verification) en suivant un bug de bout en bout, du front au back.

## Setup (5 min)

1. Clone/open this repo in Cursor or VS Code.
2. Run `npm install`.
3. Start **debug_demo — Debug API + Web** from the Run panel (compound configuration).
4. Open http://localhost:4201 (API on port 3001).

## Seed data (2 min)

Create three tasks, for example:

| Title | Priority (auto) |
|-------|-----------------|
| Alpha | 1 |
| Bravo | 2 |
| Charlie | 3 |

## Reproduce the bug (3 min)

1. Set a breakpoint in `UpdateTaskPriorityUC.handle()` on the line `working[i].priority = i` (inside the final `for` loop).
2. In the UI, move **Bravo** to priority **1** (Apply on the priority input).
3. When execution stops, inspect:
   - **Locals**: `working`, `i`, `newPriority` / `priority`
   - **Watch**: `working.map(t => ({ id: t.id, p: t.priority }))`
   - **Call stack**: `TaskController` → `UpdateTaskPriorityUC` → …

### Ce qu’il faut observer

- Est-ce que les priorités restent bien en base 1 (`1, 2, 3`) ou glissent-elles vers une numérotation `0, 1, 2` ?
- A quel moment exact la valeur `0` apparait-elle dans `priority` ?
- Peut-on prouver la cause en regardant l’etat reel d’execution (et pas seulement en lisant le code) ?

### Symptômes attendus

- Les priorités peuvent devenir `0, 1, 2` au lieu de `1, 2, 3`.
- Le probleme est visible juste apres la boucle finale de reassignment.

## Debugger features (10 min)

| Feature | Try |
|---------|-----|
| Step over / into | Step through the nested `for` loops |
| Conditional breakpoint | `working[i].id === id` |
| Logpoint | `{i} id={working[i].id} priority={working[i].priority}` |
| Front-end | Breakpoint in `TaskListComponent.changePriority()` after HTTP returns |

## Indices progressifs

### Indice 1 — regarder la forme des données

Compare la valeur de `working` avant et après la boucle finale.

Questions utiles :

- quelles valeurs sont présentes dans `priority` ?
- est-ce que l’ordre attendu est conservé ?

### Indice 2 — comparer logique et intention

Compare l’intention metier (priorites humaines en base 1) avec la valeur affectee dans la boucle (`i`).

### Indice 3 — suivre l’exécution pas à pas

Utilise le step pour suivre le parcours complet :

1. réception de la demande,
2. reassignation des priorites,
3. retour au frontend.

## Déroulé suggéré pour l’animation

1. Montrer le comportement “normal” attendu.
2. Poser la question : “où est-ce que ça casse ?”
3. Placer le breakpoint dans le backend.
4. Lire ensemble les variables locales.
5. Montrer le `watch` pour visualiser l’évolution du tableau.
6. Finir par un step-through rapide pour relier l’observation à la cause.

## Bonus pour les plus rapides

- Ajouter un `logpoint` pour suivre l’index en continu sans interrompre l’exécution.
- Mettre un breakpoint côté front dans `TaskListComponent.changePriority()` pour observer la réponse HTTP.
- Comparer le `call stack` entre le point d’entrée frontend et la logique backend.

