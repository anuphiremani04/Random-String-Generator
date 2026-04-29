# STR_GEN.v2 🔮 - Random String Generator

A futuristic, high-performance Random String Generator application built using **React.js**, **Vite**, and **Tailwind CSS v4**. This project serves as a technical demonstration of React's primary state and side-effect hooks.

---

## 🛠️ Core Features

- **Dynamic Length Control**: Slider scaling from 4 up to 64 characters.
- **Customizable Character Sets**:
  - Case Modes: Mixed, Uppercase Only, Lowercase Only.
  - Inclusion toggles for Numbers (`0-9`) and Special Symbols (`!@#`).
- **Automated Generation**: Set intervals to constantly refresh strings hands-free.
- **Smart Clipboard System**: Single-click copying with interactive success feedback.

## 🧠 Hook Implementations

### 1. `useState`
Tracks real-time adjustments across standard options and dynamically updates interface components seamlessly.

### 2. `useCallback`
Memoizes string formatting workflows, preventing redundant re-calculations during interface updates.

### 3. `useEffect`
Listens efficiently for parameters modifying background timer updates.

## 🚀 Quickstart Guide

```bash
# 1. Install all dependencies
npm install

# 2. Launch the server locally
npm run dev
```

