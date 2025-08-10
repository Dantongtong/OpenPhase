---
sidebar_label: 'Dataset'
sidebar_position: 2
---

# Dataset Splitting


## Splitting Strategies

OpenPhase provides multiple splitting strategies for robust model evaluation and generalization.

### Random Split
- Randomly split into training and test sets
- Used only as a baseline

### Stratified by Phase Outcome
- Maintain the same ratio of **y = 0 / y = 1** in training and test sets  
- Mitigates class imbalance and ensures better generalization

### Condition-based Split
Example: **Temperature**
- Five ranges:  
  0–20°C, 20–40°C, 40–60°C, 60–80°C, 80–100°C
- Three settings:
  1. **Stratified**: keep ratio of temperature ranges consistent
  2. **Zero-shot**: training set contains all entries from one range, test set contains all from others
  3. **Few-shot**: small number of samples from a specific range included in training, rest in test set  

Applied similarly to:
- Solvent concentration (quintiles)
- Ionic strength (quintiles)
- pH: 3.5–5.5, 5.5–7.5, 7.5–9.5
- Crowding agent: binary stratified split only

### Component-based Split
- Each multicomponent system type (e.g., protein(1), protein(2), protein(1)+DNA) treated separately
- Enables fair evaluation per system type

---

## User-friendly Dataset Interface

OpenPhase offers a PyTorch-compatible dataset interface:
- Inherits from `torch.utils.data.Dataset`
- Easy to download, access entries, and retrieve **x**, **c**, **y** values
- Works seamlessly with PyTorch `DataLoader`
- Includes:
  - Precomputed embeddings (proteins, RNA, DNA, conditions)
  - Predefined split functions
  - Extra interface for **phase diagram grids** access and visualization in db2
- Transparent processing steps, enabling:
  - Error correction
  - Adding new entries
  - Custom adaptation for specific research needs

```mermaid
%%{init: {'flowchart': {'htmlLabels': true, 'curve':'linear', 'nodeSpacing': 30, 'rankSpacing': 40}}}%%
flowchart TB
  %% === styles ===
  classDef feat fill:#F7FBFF,stroke:#2B6CB0,stroke-width:2px,color:#0b3b7a;
  classDef step fill:#ffffff,stroke:#94a3b8,stroke-width:1.5px,color:#0f172a;
  classDef dim  fill:#EEF2FF,stroke:#4F46E5,stroke-width:1.5px,color:#111827;

  %% === inputs (5 features) ===
  T["Temperature<br/>(10 bins)"]:::feat
  S["Solute conc.<br/>(μM, log)"]:::feat
  I["Ionic strength<br/>(mM, log)"]:::feat
  P["Buffer pH"]:::feat
  C["Crowding agent<br/>(0/1)"]:::feat

  %% stack inputs vertically then go to join
  T --> J
  S --> J
  I --> J
  P --> J
  C --> J

  %% concatenate step
  J[["Concatenate"]]:::step --> V

  %% === output vector (14-D), vertical layout ===
  subgraph V["Unifiedconditionvector(14)"]
    direction TB

    %% Temperature bins stacked vertically (10 dims)
    subgraph TD["Temperature (10)"]
      direction TB
      T1["T₁"]:::dim
      T2["T₂"]:::dim
      T3["T₃"]:::dim
      T4["T₄"]:::dim
      T5["T₅"]:::dim
      T6["T₆"]:::dim
      T7["T₇"]:::dim
      T8["T₈"]:::dim
      T9["T₉"]:::dim
      T10["T₁₀"]:::dim
    end

    SC["Solute (1)"]:::dim
    IS["Ionic (1)"]:::dim
    PH["pH (1)"]:::dim
    CA["Crowding (1)"]:::dim
  end

  %% optional note
  N["Temp bins: 0–100°C (10°C each).<br/>&lt;25°C → T₁–T₃ active; 37°C → T₃ active"]:::step
  V -.-> N
```

![Experimental Condition Encoding](/img/A_flowchart_illustrates_the_encoding_of_experiment.png)