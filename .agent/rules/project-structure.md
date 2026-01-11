---
trigger: manual
---

## 🏗️ **1. My Project Structure Overview**

```
src/
├── app/
│   ├── (public)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── auth/
│   │       └── route.ts
│   ├── globals.css
│   └── providers.tsx
│
├── components/
│   ├── atoms/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── input-box.tsx
│   │   ├── nav-item.tsx
│   │   ├── text.tsx
│   │   ├── icon.tsx
│   │   └── badge.tsx
│   │
│   ├── molecules/
│   │   ├── form-field.tsx
│   │   ├── select-group.tsx
│   │   ├── card-header.tsx
│   │   └── search-box.tsx
│   │
│   ├── organisms/
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── auth-form.tsx
│   │   └── data-table.tsx
│   │
│   ├── templates/
│   │   ├── dashboard-shell.tsx
│   │   └── auth-layout.tsx
│   │
│   └── index.ts
│
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── login-form.tsx
│   │   │   └── register-form.tsx
│   │   ├── actions/
│   │   ├── schemas/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types.ts
│   │
│   ├── users/
│   ├── payments/
│   └── settings/
│
├── hooks/
│   ├── use-toggle.ts
│   ├── use-debounce.ts
│   └── use-media-query.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── db.ts
│   ├── utils.ts
│   ├── fetcher.ts
│   └── constants.ts
│
├── store/
│   ├── user-store.ts
│   ├── theme-store.ts
│   └── modal-store.ts
│
├── styles/
│   ├── variables.css
│   ├── typography.css
│   └── animations.css
│
├── types/
│   ├── api.ts
│   ├── form.ts
│   └── global.ts
│
└── schemas/
    ├── auth-schema.ts
    ├── user-schema.ts
    └── form/
```

---

## 🎨 **2.My Atomic Design System Rules**

### **Atoms** (Simple UI Elements)

Atoms are the smallest possible UI components.

* Must be **pure UI only**
* No heavy logic
* Must be **fully reusable**
* Tailwind classes preferred

Examples:

* `button.tsx`
* `input.tsx`
* `icon.tsx`
* `badge.tsx`
* `text.tsx`

Naming rule: **`lowercase-hyphen` format**

---

### **Molecules** (Combination of Atoms)

Molecules combine atoms to create more useful components.

* Slight logic allowed (validation state, UI toggles)
* Should remain reusable

Examples:

* `form-field.tsx` → label + input + error
* `select-group.tsx` → select + label
* `card-header.tsx`
* `search-box.tsx`

Naming rule: **describes its function**

---

### **Organisms** (Complex UI Sections)

Organisms combine molecules + atoms to form full functional sections.

* Can include logic + hooks
* Can be domain-specific

Examples:

* `navbar.tsx`
* `sidebar.tsx`
* `auth-form.tsx`
* `data-table.tsx`

---

### **Templates** (Page Layout Builders)

Templates define the structure of pages.

* No page-specific data
* Provide scaffolding for actual content

Examples:

* `auth-layout.tsx`
* `dashboard-shell.tsx`

---

## 🔧 **3. MY Features Directory (Highly Scalable Pattern)**

Each domain feature gets its own folder.
Keeps logic isolated.

Example: `features/auth/` includes:

```
components/
actions/
schemas/
hooks/
lib/
types.ts
```

This structure scales perfectly as the project grows.

---

## 🎯 **4. My Naming Conventions**

### **Components**

* ✔ all lowercase
* ✔ hyphens for multi-word components
* `input-box.tsx`
* `nav-item.tsx`

### **Folders**

* Lowercase
* Hyphens optional

### **React Files**

* Always `.tsx`

### **Schemas**

* `auth-schema.ts`
* `user-schema.ts`

### **Hooks**

* Always start with `use-`
* `use-toggle.ts`

---

## ⚙️ **5. My Tailwind CSS Guidelines**

### Use Tailwind for:

* Layout
* Spacing
* Colors
* Typography
* Responsive design

### Component style guidelines:

* No CSS files inside components unless needed
* Prefer utility classes over custom CSS
* Use `styles/` folder only for global tokens

---

## 📐 **7. Best Practices Checklist**

### **Components**

* Keep atoms simple and stateless
* Move logic upward into organisms or features
* Keep component names readable & lowercase

### **App Router**
* Alaways use server component for all page.tsx 
* Use route groups: `(auth)` `(dashboard)`
* Use layouts everywhere possible
* Use server components by default

### **Code Quality**

* Use Zod for all forms
* Use separate `features/` folder for domain logic
* Reuse atoms/molecules across project

### ** Statement management library **

* use zustand when user asking for state management library

### ** Supabase use cases **

* use supabase when user asking it. 
* clean and best practice of supabase