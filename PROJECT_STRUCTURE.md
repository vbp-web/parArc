# Project Structure - Folder and Project Pages

## Overview
The architecture portfolio website now uses a **two-level navigation structure**:
1. **Main Page (index.html)**: Displays folder cards for different project categories
2. **Category Pages**: Individual pages for each folder showing projects within that category

## Structure

### Main Page (`index.html`)
- Shows 4 folder cards:
  - **Residential** → Links to `residential.html`
  - **Cultural** → Links to `cultural.html`
  - **Commercial** → Links to `commercial.html`
  - **Public** → Links to `public.html`

- Each folder card displays:
  - Category icon
  - Category title
  - Description
  - Project count
  - Arrow indicator

### Category Pages
Currently created:
- `residential.html` - Shows all residential projects

Need to create:
- `cultural.html` - For cultural projects
- `commercial.html` - For commercial projects
- `public.html` - For public projects

## Files Created/Modified

### HTML Files
- `index.html` - Main page with folder cards (UPDATED)
- `residential.html` - Residential projects page (NEW)

### CSS Files
- `css/style.css` - Updated folder card styles for navigation
- `css/projects.css` - Styles for project pages (NEW)

### JavaScript Files
- `js/main.js` - Removed folder toggle functionality
- `js/projects.js` - JavaScript for project pages (NEW)

## How It Works

1. **User visits main page** → Sees 4 folder cards
2. **User clicks a folder** (e.g., "Residential") → Navigates to `residential.html`
3. **Category page loads** → Shows all projects in that category
4. **User can go back** → Click "Back to Folders" link to return to main page

## Features

### Folder Cards (Main Page)
- Hover effects with scale and lift animations
- Shimmer effect on hover
- Icon rotation on hover
- Arrow slides right on hover
- Smooth transitions

### Project Cards (Category Pages)
- Staggered fade-in animations
- 3D tilt effect on mouse move
- Image zoom on hover
- Lift effect on hover
- Responsive grid layout

## Next Steps

To complete the implementation, create the remaining category pages:
1. Copy `residential.html` to create `cultural.html`, `commercial.html`, and `public.html`
2. Update the page title, icon, and subtitle for each category
3. Add the appropriate projects for each category

## Responsive Design
- Mobile: Single column layout
- Tablet: 2 columns
- Desktop: Up to 3-4 columns depending on screen size
