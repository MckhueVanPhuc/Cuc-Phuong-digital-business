# Screen Specification: <Screen name>

| Field | Value |
|---|---|
| Screen ID | `SCR-Mnn-nnn` |
| Screen name | |
| Module | `Mnn` |
| Actor | |
| Priority | Must / Should / Could |
| Mockup | `<path>` or `Not available` |
| Status | Draft / Approved |

## 1. Purpose

**Shown when:** <trigger>

**The user leaves when:** <exit condition>

## 2. Mockup

`[NEEDS CLARIFICATION: provide an approved mockup path or confirm that no mockup is required.]`

## 3. Element inventory

Every visible or interactive element needs one row.

| # | Element ID | Element | Type | Content / data source | Required | Validation |
|---|---|---|---|---|---|---|
| 1 | E-SCR-Mnn-nnn-01 | | Header / text / input / button / list / image | | Yes / No | None / rule |

## 4. States

| State | What the user sees | Trigger |
|---|---|---|
| Default | | |
| Empty | `Not applicable — <reason>` or description | |
| Loading | `Not applicable — <reason>` or description | |
| Error | `Not applicable — <reason>` or description | |
| Success / confirmation | `Not applicable — <reason>` or description | |

## 5. Interactions and navigation

| # | Element | User action | System response | Destination screen / result |
|---|---|---|---|---|
| 1 | | Tap / type / swipe | | `SCR-Mnn-nnn` / stays |

## 6. Screen-level rules

| Rule ID | Rule | Related requirement |
|---|---|---|
| SR-SCR-Mnn-nnn-001 | | FR-Mnn-nnn |

## 7. Linked requirements

| FR ID | How the screen supports it |
|---|---|
| FR-Mnn-001 | |

## 8. Responsive and accessibility notes

- [NEEDS CLARIFICATION: smallest supported viewport and responsive behaviour.]
- [NEEDS CLARIFICATION: accessibility requirements beyond the product's general standards.]

## 9. Open questions

| ID | Question | Blocking | Status |
|---|---|---|---|
| OQ-SCR-Mnn-nnn-001 | [NEEDS CLARIFICATION: question] | Yes / No | Open |

## Completion checklist

- [ ] Every visible/interactable element is in the inventory.
- [ ] Each input has a validation rule or explicit `None`.
- [ ] Each state is described or marked not applicable with a reason.
- [ ] Navigation targets and linked requirements resolve.
