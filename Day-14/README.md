# CBE Mobile Banking Interface

A fictional recreation of the Commercial Bank of Ethiopia (CBE) mobile banking interface shown in the reference screenshot.

This project was created for CodeOps Module 2 Day 14 to practice CSS Grid, Flexbox and CSS positioning.

## Interface Rebuilt

Commercial Bank of Ethiopia (CBE) mobile banking interface.

The interface includes:

- CBE account balance card
- Services section
- Top Up
- Transfer
- Banking
- Utility
- Government Services
- Travel
- Payment
- Entertainment
- Bottom navigation
- Floating QR button

## CSS Grid

CSS Grid is used for:

- The overall page skeleton
- Header area
- Sidebar area
- Main content area
- Footer area
- Responsive services card grid

The page skeleton uses:

grid-template-areas

The services use:

repeat(auto-fit, minmax(180px, 1fr))

## Flexbox

Flexbox is used for:

- Header layout
- Header actions
- Sidebar navigation
- Account card content
- Bank information
- Balance section
- Service cards
- Bottom navigation

Flexbox directions include:

- flex-direction: row
- flex-direction: column

## Positioning

The project demonstrates:

- position: sticky for the header
- position: relative for the account card
- position: absolute for the floating QR button
- z-index for the sticky header

## Responsive Design

A single media query at 700px changes the desktop Grid layout into a mobile one-column layout.

The sidebar disappears on mobile and the bottom navigation remains visible.

## Technologies

- HTML5
- CSS3
- CSS Grid
- Flexbox
- Responsive CSS