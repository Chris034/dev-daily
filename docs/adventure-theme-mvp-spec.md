# Adventure Theme MVP Spec

## 1. Goal
Ship a polished, mobile-first Adventure Quest dashboard experience with minimal features and strong visual quality inspired by premium travel products.

## 2. Product Direction
- Theme: Adventure journal + quest planner.
- Visual style: clean cards, high-quality spacing, warm natural palette, soft depth.
- UX tone: simple, motivating, no clutter.

## 3. MVP Scope
### Included
- Real photo upload from user device.
- Persistent progress using browser localStorage.
- Mobile-first layout that scales to desktop.
- Achievement badges based on progress milestones.
- Quest category filtering:
  - Food
  - Travel
  - Seasonal
  - Romantic

### Excluded (for first version)
- Backend storage/API.
- Multi-user auth.
- Social feeds.
- Complex gamification rules.

## 4. User Stories
- As a user, I can upload a real photo for my current adventure so the app feels personal.
- As a user, my quest progress is preserved across refreshes.
- As a user, I can switch categories and quickly see relevant quests.
- As a user, I receive badge feedback when I complete milestones.
- As a mobile user, the app remains usable and visually polished on small screens.

## 5. UX Requirements
- Primary screen is a single dashboard with:
  - Hero card with title, subtitle, and progress summary.
  - Photo upload panel with live preview.
  - Category pills.
  - Quest cards with complete toggles.
  - Badge strip.
- Keep interaction count low and labels clear.
- Ensure tap targets are thumb-friendly.

## 6. Data Model (Client-only)
- localStorage key: adventure_mvp_state_v1
- Shape:
  - selectedCategory: string
  - completedQuestIds: string[]
  - uploadedPhotoDataUrl: string | null

## 7. Badge Rules
- First Step: complete >= 1 quest.
- Trail Runner: complete >= 3 quests.
- Pathfinder: complete >= 6 quests.

## 8. Technical Plan
- Frontend only implementation in apps/web.
- React local state + localStorage sync in dashboard page.
- Replace brittle dashboard dependencies with self-contained logic.
- Keep routes for dashboard, lessons, settings, but use lightweight pages to avoid broken imports.
- Update global CSS to a cohesive adventure design system.

## 9. Delivery Plan
1. Create spec document (this file).
2. Implement dashboard MVP features and design.
3. Stabilize routing and shell layout.
4. Build and validate.
5. Initialize/push git changes.
6. Deploy static web app to GitHub Pages.

## 10. Acceptance Criteria
- User can upload a real image and see it immediately.
- Refreshing the page preserves uploaded image and completed quests.
- Category filter works for all four quest categories.
- Badge section updates based on completion count.
- Layout is clearly mobile-first and polished on desktop.
- App builds successfully.
- Changes are pushed to GitHub and published on GitHub Pages.
