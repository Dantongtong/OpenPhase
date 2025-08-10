---
sidebar_label: 'System'
sidebar_position: 2
---

# Experiment System

The **OpenPhase dataset** is a curated and processed collection of validated phase-separating systems under diverse experimental conditions.  
It combines two major components:

---

## Dataset Components

### **db1** — Filtered and Numericalized LLPSDB v2.0
- **Source:** LLPSDB v2.0 (Wang et al., 2022), dated Jan 13, 2022.
- **Content:**  
  - 2,917 entries of phase-separating systems  
  - 586 unique proteins  
  - 6,678 experimental conditions  
- **Compared to LLPSDB v1.0 (Li et al., 2020):**
  - ~3× entries  
  - ~2× conditions
- **System Types:**  
  - Protein-only: `protein(1)` to `protein(7)`  
  - Protein–RNA: `protein(1)+RNA` to `protein(3)+RNA`  
  - Protein–DNA: `protein(1)+DNA` to `protein(4)+DNA`
- **Representative Systems Retained for Modeling:**
  - `protein(1)`, `protein(2)`, `protein(3)`
  - `protein(1)+DNA`
  - `protein(1)+RNA`, `protein(2)+RNA`
- **Processing Steps:**
  1. Removed non-representative systems
  2. Corrected mislabeled entries
  3. Removed entries with missing or unparseable experimental conditions

---

### **db2** — Manually Collected LLPS Records
- **Source:** Laboratory notebooks (manual curation)
- **Content:**
  - 1,188 experimentally validated entries
  - Captures both **in vitro** and **in vivo** systems
  - Includes **natural** and **synthetic** constructs
- **Significance:**
  - First condition-dependent phase quantification dataset (regression)
  - High-resolution quantitative outcomes of phase experiments
- **Applications:**
  - Independent data source for phase diagram exploration
  - Benchmarking condition-aware computational models

---

## Coverage and Scope

The dataset covers a **wide range of multi-component systems**, such as:
- Protein-only systems
- Protein–RNA systems
- Protein–DNA systems

**Experimental condition annotations** include:
- Salt concentration
- Temperature
- pH
- Solute concentration
- Crowding agent

This comprehensive annotation enables:
- Systematic benchmarking  
- Development of **condition-aware phase separation models**  
- Exploration of how **sequence** and **environmental context** jointly influence condensate formation

---

## Visual Overview

- **Figure:** Seven representative system types in OpenPhase:
  1. Protein-only systems with 1–3 proteins
  2. Protein–nucleic acid systems (RNA/DNA) with 1–2 proteins


```mermaid
flowchart LR
  subgraph OP["OpenPhase Dataset"]
    direction LR

    subgraph DB2["db2 • Manually Collected Lab Records"]
      direction TB
      B1["Source: Lab notebooks (manual curation)"]
      B2["Entries: 1,188 (validated)"]
      B3["Contexts: in vitro & in vivo<br/>Natural & synthetic constructs"]
      B4["First condition-dependent<br/>phase quantification (regression),<br/>high-resolution outcomes"]
      B5["Use: Independent data source<br/>for phase diagram exploration"]
      B1 --> B2 --> B3 --> B4 --> B5
    end

    subgraph DB1["db1 • LLPSDB v2.0 (Wang 2022)"]
      direction TB
      A1["Source: LLPSDB v2.0<br/>Date: 2022-01-13"]
      A2["Entries: 2,917"]
      A3["Unique Proteins: 586"]
      A4["Experimental Conditions: 6,678"]
      A5["Types:<br/>• Protein-only: protein(1)~protein(7)<br/>• Protein–RNA: protein(1)~protein(3)+RNA<br/>• Protein–DNA: protein(1)~protein(4)+DNA"]
      A6["Processing:<br/>1) Remove non-representative systems<br/>2) Fix mislabeled entries<br/>3) Drop missing/unparseable conditions"]
      A7["Kept (for modeling):<br/>protein(1),(2),(3);<br/>protein(1)+DNA;<br/>protein(1)+RNA,(2)+RNA"]
      A1 --> A2 --> A3 --> A4 --> A5 --> A6 --> A7
    end
    
  end

  %% Shared annotations for both db1 & db2
  C["Condition Annotations:<br/>• Salt concentration • Temperature • pH<br/>• Solute concentration • Crowding agent"]
  D["Applications:<br/>• Benchmarking condition-aware models<br/>• Phase boundary mapping & prediction<br/>• Sequence–environment interplay"]
  OP --> C
  OP --> D
  
  ```

  ## Experimental Conditions

OpenPhase unifies the representation of experimental conditions, following the process described in Droppler (Raimondi et al. 2021).  
Conditions are represented as a **concatenated vector of 5 features**:

1. **Temperature**  
2. **Solute concentration** (protein, DNA/RNA)  
3. **Ionic strength** (salt concentration)  
4. **Buffer pH**  
5. **Crowding agent**  

The five features are combined into a **14-dimensional condition vector**:
- Temperature: 10 dimensions (one per 10°C range)
- Solute concentration: 1 dimension
- Ionic strength: 1 dimension
- pH: 1 dimension
- Crowding agent: 1 dimension

> Entries with missing values in any feature are removed to ensure data quality.

### Temperature
- All values converted to Celsius
- Represented as a **10-dimensional one-hot vector** (0–100°C, each dimension = 10°C bin)
- Special cases:
  - Room temperature: 25°C
  - Warming by hand: 37°C
  - Freezing/thawing: 0°C  
- Examples:
  - `< 25°C` → `[1, 1, 1, 0, 0, 0, 0, 0, 0, 0]ᵀ`
  - `= 37°C` → `[0, 0, 1, 0, 0, 0, 0, 0, 0, 0]ᵀ`

### Ionic Strength
- Extracted as the mean value of the reported range
- Minor differences in ion type (NaCl, KCl, MgCl₂, etc.) ignored
- Unit: **mM**, logarithm applied to unify scale

### Solute Concentration
- Sum of all solutes from descriptions
- Unit: **μM**, logarithm applied

### Buffer pH
- Extracted from description
- If a range is given, the mean is used

### Crowding Agent
- Binary: absent = 0, present = 1
- Common examples: polyethylene glycol (PEG), dextran, Ficoll

---