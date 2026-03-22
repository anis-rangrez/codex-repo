# 99 World-Class UI/UX Guidelines for Viblink
**A manifesto for AI Agents and Developers to create premium, engaging, and flawless digital experiences.**

---

## 🏗️ I. Foundation & Layout (1-15)
1. **The 30-60-10 Color Rule:** Use 60% neutral background, 30% secondary brand color (surfaces/cards), and 10% high-contrast accent color (CTAs, icons).
2. **Whitespace is a Feature:** Negative space is not empty space. Double the margins between unrelated sections compared to related components inside a card.
3. **8pt Grid System:** All padding, margins, and sizing should be increments of 8 (8, 16, 24, 32, 40, etc.). Use 4pt only for micro-adjustments.
4. **Z-Pattern Layouts for Web:** The eye moves from top-left to top-right, then diagonally down to bottom-left, then across to bottom-right.
5. **Mobile Rule of Thumb:** 75% of interactions are thumb-driven. Place primary navigation and core actions in the bottom third of the screen.
6. **Max Width for Readability:** Text blocks should never exceed 70-80 characters in width. On desktop, constrain reading containers to 680px - 720px.
7. **Progressive Disclosure:** Only show users what they absolutely need to see right now. Hide advanced settings behind a "Show More" or separate modal.
8. **Consistent Visual Hierarchy:** The most important element on the screen should be the heaviest (largest, brightest, highest contrast).
9. **Avoid Symmetrical Boredom:** Perfect visual symmetry often feels cheap. Use asymmetrical layouts (like a 60/40 split column) to create dynamic tension.
10. **Above-the-Fold is still Real:** While users scroll, your core value proposition and primary Call-To-Action (CTA) must be visible instantly without scrolling.
11. **Bleeding Edges:** Let background imagery or horizontal scrolling lists bleed off the edge of the screen to indicate continuous content.
12. **The F-Pattern for Text-Heavy Pages:** Users scan text in an 'F' shape. Put critical keywords at the start of bullet points and paragraphs.
13. **Card Modularity:** Group related information strictly within cards. Cards should have consistent corner radii (e.g., `rounded-2xl` 16px).
14. **Optical Alignment over Mathematical:** Center rounded objects and text optically rather than strictly mathematically by tweaking paddings.
15. **Avoid "Walls of Text":** Break text down with lists, icons, bold emphasis, and short paragraphs to reduce cognitive load.

## 🎨 II. Color & Aesthetics (16-30)
16. **Ban Pure Black and Pure White:** Pure #000000 causes eye strain on screens. Use a dark slate (e.g., #0A0A0F) for backgrounds. Pure white #FFFFFF is fine for cards, but backgrounds should be #F8F8FC.
17. **Semantic Color Usage:** Red is ONLY for errors/destructive actions. Green is ONLY for success. Orange is ONLY for warnings. Never use semantic colors for branding unless it's strictly the brand identity.
18. **WCAG AA Contrast Minimum:** All vital text must have a minimum contrast ratio of 4.5:1 against its background.
19. **Dark Mode Density:** In Dark Mode, do not just invert colors. Backgrounds should be very dark grey/purple, and cards should be slightly lighter. Shadows don't work well in dark mode; use subtle borders (`border-dark-border`) instead.
20. **Gradients for Depth, Not Distraction:** Use subtle linear gradients (e.g., purple to magenta) to signify premium features without overpowering the user.
21. **Desaturate Text on Dark Backgrounds:** Pure white text on a black background vibrates. Use a very light grey/zinc (e.g., #F4F4F5) for primary reading text in dark mode.
22. **The V-Squint Test:** If you squint at the screen, the primary CTA should be the only thing that clearly stands out as a blob of color.
23. **Glow over Drop Shadow:** For modern, premium aesthetics (especially in dark mode), use colored glows (`shadowBrandGlow`) instead of harsh black drop shadows.
24. **Color Temperature Consistency:** Keep neutrals uniformly cool (blue/purple-tinted greys like Zinc/Slate) or warm (yellow-tinted like Stone). Do not mix them.
25. **Hover and Active States:** Every interactive element must change color on hover (desktop) and active press (mobile). Shift the lightness by 10%.
26. **Disabled States:** Disabled buttons should have extremely low contrast (greyed out) and an opacity of `0.5`.
27. **Avoid the "Skittles Effect":** Do not use more than two primary brand colors on a given screen.
28. **Subtle Background Tints:** For grouped content backgrounds, use a 3-5% opacity tint of your primary brand color rather than generic grey.
29. **Text Color Hierarchy:** Primary text (100% opacity), Secondary Text / subheaders (70% opacity), Muted/Caption text (50% opacity).
30. **Focus Rings:** Ensure inputs and select boxes have highly visible, branded focus rings (e.g., `ring-2 ring-accent`).

## ✍️ III. Typography (31-45)
31. **Limit Font Families:** Use a maximum of two font families. One for headings (energetic, stylized) and one for body (legible, neutral). (e.g., Plus Jakarta Sans).
32. **Tighten Headings, Relax Body:** Headings should have tight line-heights (1.1 - 1.2) and tracking (-0.02em). Body text needs loose line-heights (1.5 - 1.6) and normal tracking.
33. **Skip Weights:** When creating contrast between text elements, skip a font weight category (e.g., Default to Bold, skip Medium).
34. **Left-Align by Default:** Center-aligned text is only for short marketing headlines (max 3 lines). Never center-align paragraphs.
35. **Base Font Size:** Treat 16px as the absolute minimum size for readable body copy on mobile. 18px is often better.
36. **All-Caps Needs Spacing:** Whenever using ALL CAPS (like overlines or small labels), you MUST increase the letter-spacing to `0.5em` to make it legible.
37. **Numbers Should be Tabular:** When putting numbers in a table or dashboard, use tabular figures so the decimal points perfectly align vertically.
38. **Never Use Underlines for Emphasis:** Underlines should be strictly reserved ONLY for clickable hyperlinks.
39. **Typographic Scale:** Use a geometric progression for text sizes (e.g., 12, 14, 16, 20, 24, 32, 40, 48, 64). Don't invent random sizes.
40. **Smart Quotes and Apostrophes:** Ensure your CMS or UI uses curly apostrophes (’) rather than straight computer primes ('). It instantly looks more professional.
41. **Limit Line Lengths:** As noted before, no more than 75 characters per line to avoid eye fatigue.
42. **Use Overlines:** A brightly colored, all-caps, small font above a main `H1` provides context without clutter.
43. **Color Contrast in Typography:** Never use pure black text. Use very dark grey (`#111216`) to reduce jagged rendering.
44. **Hanging Punctuation:** For large quotes, pull the quotation marks into the margin so the text block perfectly aligns on the left.
45. **Skeleton Fonts:** While loading data, render a gray block exactly the height of the intended typography to prevent layout shifts.

## 🎯 IV. Interactions & Micro-interactions (46-60)
46. **Doherty Threshold (Sub 400ms):** Users perceive any interaction that takes longer than 400ms as "loading". Instant UI feedback is mandatory.
47. **Skeletons > Spinners:** Show a skeleton layout of where the content *will* be instead of a generic circular loading spinner. It drastically reduces perceived wait time.
48. **Button Affordance:** Buttons must look undeniably clickable. Maintain a minimum height of 44px-48px for mobile tap targets.
49. **Haptic Feedback:** On mobile, tie subtle haptic vibrations to major state changes (success, error, toggling a switch, pulling to refresh).
50. **Smooth Transitions:** Route changes and modals should scale, slide, or fade in over 200-300ms using an `ease-out` easing function. 
51. **Staggered Animations:** When rendering a list, animate each item in slightly offset from the previous (e.g., 50ms delay per row).
52. **The "Oops" Factor:** Always allow users to easily reverse destructive actions. Prefer an "Undo" toast notification over a blocking "Are you sure?" alert modal.
53. **Swipe to Go Back:** On native mobile apps, ensure the iOS swipe-from-left edge to go back works globally.
54. **Sticky Headers on Scroll Up:** Hide the top navigation bar when the user scrolls down to read, but immediately slide it back into view when they scroll up.
55. **Skeleton States Should Pulse:** Don't just show static grey boxes. Give them a subtle, left-to-right shimmering gradient to prove the app isn't frozen.
56. **Empty States are Opportunities:** Never show a blank screen with "No Data". Use an illustration and a CTA that tells them how to get data (e.g., "Add your first friend!").
57. **Ripple Effects:** Add soft radial ripples or scaled press-animations when a button is actively clicked.
58. **Micro-copy matters:** Instead of "Submit", use action-oriented verbs like "Create Account" or "Send Message".
59. **Hover Pre-fetching:** If a web user hovers over a primary link for >50ms, start fetching the data immediately so the click is instant.
60. **Input Shake on Error:** When a user types a wrong password, subtly shake the input field left and right to signal the mistake physically.

## 📝 V. Forms & Inputs (61-75)
61. **One Column Forms:** Keep form fields in a single vertical column. Multi-column forms disrupt the natural vertical tab flow.
62. **Labels Above Inputs:** Labels should permanently reside above the text field, not inside as a disappearing placeholder. 
63. **Inline Validation is Mandatory:** Do not wait for the user to click "Submit" to tell them their email is invalid. Validate right as they finish typing (onBlur).
64. **Never Mask Passwords Completely:** Give them an eye icon to toggle password visibility. 
65. **Smart Defaults:** Pre-fill known data (like country code based on IP, or filling an address from a ZIP code) to save the user keystrokes.
66. **NumPad for Numbers:** Ensure inputs requiring numbers (PINs, phone numbers) explicitly trigger the `numeric` mobile keyboard. 
67. **Visual Delineation:** The input background color must be slightly different from the page background so it clearly looks like a hole to be filled.
68. **Avoid Dropdowns if Options < 5:** If an input has 2-4 options, use horizontal Radio Buttons or Segmented Controls. Clicking a dropdown is unnecessary friction.
69. **Search with Real-time Filtering:** Search bars should filter results underneath instantly with every keystroke. 
70. **Disable Submit on Submit:** Immediately disable the submit button and show a spinner inside it the moment it is clicked, to prevent duplicate form submissions.
71. **Generous Touch Targets for Checkboxes:** Do not make the user click the tiny 16px square. Make the *entire row label* clickable to toggle the checkbox.
72. **Input Suffixes for Clarity:** If asking for a price or weight, put the symbol ($, lbs) visually inside the input field so they don't type it manually.
73. **Clear Error Copy:** Don't say "Invalid format". Say "Please include an @ symbol in your email address." Be specific and helpful.
74. **Auto-Focus the First Field:** The moment a modal or form page opens, focus the keyboard on the first input automatically so the user can just start typing.
75. **Floating Action Buttons (FAB):** Keep primary creation actions (e.g., "New Post") floating in the bottom right corner on mobile.

## 🔍 VI. Navigation & Architecture (76-85)
76. **Limit Nav Links to 5-7 Items:** Short-term human memory can only hold about 7 items. Do not clutter your top navigation.
77. **Fat Footers:** Put links to policies, deep-level pages, secondary features, and social logos in a massive footer to keep the header clean.
78. **Breadcrumbs for Depth:** If a user goes 3 levels deep into the app (e.g., Home > Sneakers > Nike), show breadcrumbs so they remember where they are.
79. **Tab Bars vs Drawers:** On mobile, use bottom Tab Bars for 2-5 core destinations. Only use Hamburger menu drawers for secondary/settings items.
80. **Active States in Nav:** Always visually highlight *exactly* which page the user is currently on in the navigation bar using color or bold text.
81. **Frictionless Sign In:** Group "Sign in with Google/Apple" at the top of auth screens. Put manual email login at the bottom.
82. **Infinite Scroll vs Pagination:** Infinite scroll is great for social feeds. Pagination is mandatory for e-commerce or data tables where users need to find specific items again.
83. **Search Centricity:** If your app relies on data discovery (Spotify, Airbnb), put massive, highly visible Search bar directly in the center of the navigation or hero.
84. **Escape Modal by tapping background:** Modals MUST close if the user clicks the dark faded backdrop behind the modal. 
85. **Sticky "Buy" Buttons:** On e-commerce product pages, if they scroll past the 'Add to Cart' button, make a small version of it stick to the bottom/top of the screen.

## 🤝 VII. Trust, Psychology & Accessibility (86-99)
86. **Social Proof Validation:** Users trust what others trust. Incorporate user reviews, "Trusted by X", and avatars early in landing pages.
87. **Zeigarnik Effect:** People remember uncompleted tasks better than completed ones. Use progress bars (e.g., "Profile 60% Complete") to encourage users to finish onboarding.
88. **Loss Aversion:** It's more painful to lose something than to gain it. Frame copy around what they will miss (e.g., "Don't miss out on saving 20%") versus what they will gain.
89. **Include Tooltips for Jargon:** If a specific industry term must be used, add a subtle dotted underline or info icon that explains it on hover.
90. **Screen Reader Alt Text:** Ensure every non-decorative image has an `alt=` attribute so visually impaired users can experience the app.
91. **Focus Outline Visibility:** Never use `outline: none` without providing a custom ring state. Keyboard navigators rely entirely on focus rings.
92. **High Contrast for Success/Warnings:** Do not rely on color alone to convey error. Add a warning triangle icon alongside the red color, because colorblind users cannot see the red.
93. **Endowment Effect:** Users value things more highly once they feel ownership. Use phrases like "Your Dashboard" instead of "The Dashboard".
94. **Law of Proximity:** Things that are visually close together are perceived to be related. Space out disjointed elements aggressively.
95. **Fitts's Law on Call to Actions:** The time it takes to move to a target is a function of the distance and size. Make primary CTAs massive and close to the thumb/mouse center.
96. **Minimize Choice Paralysis (Hick's Law):** Limit pricing pages to 3 tiers. Highlight the "Most Popular" middle tier to anchor their decision.
97. **Consistent Lexicon:** If you call it a "Post" on one screen, don't call it an "Article" on another. Keep exact terminology uniform globally.
98. **Delight the User (Easter Eggs):** Add extremely tiny moments of joy, like an animation when clicking an empty heart icon, or a confetti burst on task completion. 
99. **Test it Yourself:** The ultimate guideline. If the developer/designer uses the app themselves for an hour, 90% of UX flaws will become instantly obvious. Dogfood your own product constantly!

---
*Generated by Antigravity AI, optimized for Viblink System Agentic instructions.*
