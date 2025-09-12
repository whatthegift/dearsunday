
# Sidebar Components Documentation

## Overview
The sidebar components provide a flexible, customizable sidebar system for React applications, built using Radix UI and Tailwind CSS.

## Components

### 1. SidebarProvider
The root component that manages sidebar state and provides context.

#### Props
- `defaultOpen`: Boolean to set initial sidebar state (default: `true`)
- `open`: Controlled open state of the sidebar
- `onOpenChange`: Callback when sidebar open state changes

#### Usage
```typescript
<SidebarProvider>
  <AppLayout>
    <AppSidebar />
    <MainContent />
  </AppLayout>
</SidebarProvider>
```

### 2. Sidebar
The main sidebar container component.

#### Props
- `side`: 'left' or 'right' positioning (default: 'left')
- `variant`: 'sidebar' | 'floating' | 'inset' (default: 'sidebar')
- `collapsible`: 'offcanvas' | 'icon' | 'none' (default: 'offcanvas')

#### Usage
```typescript
<Sidebar variant="sidebar" collapsible="icon">
  <SidebarHeader />
  <SidebarContent />
  <SidebarFooter />
</Sidebar>
```

### 3. SidebarMenu & SidebarMenuItem
Create nested menu structures within the sidebar.

#### Usage
```typescript
<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton>
      <Home /> Home
    </SidebarMenuButton>
  </SidebarMenuItem>
</SidebarMenu>
```

### 4. SidebarGroup & SidebarGroupLabel
Organize sidebar content into logical sections.

#### Usage
```typescript
<SidebarGroup>
  <SidebarGroupLabel>Navigation</SidebarGroupLabel>
  <SidebarGroupContent>
    {/* Menu items */}
  </SidebarGroupContent>
</SidebarGroup>
```

### 5. SidebarTrigger
A button to toggle sidebar visibility.

#### Usage
```typescript
<SidebarTrigger>
  Toggle Sidebar
</SidebarTrigger>
```

## Hooks

### useSidebar()
Access sidebar state and methods in child components.

```typescript
const { 
  state,           // 'expanded' | 'collapsed'
  open,            // Current open state
  setOpen,         // Method to set open state
  isMobile,        // Mobile detection
  toggleSidebar    // Toggle sidebar method
} = useSidebar()
```

## Customization
- Sidebar width and styling can be customized via Tailwind classes
- Responsive design built-in
- Supports keyboard shortcut (Cmd/Ctrl + B) to toggle

## Best Practices
- Always wrap content with SidebarProvider
- Use semantic HTML and accessibility attributes
- Leverage responsive variants for different layouts
