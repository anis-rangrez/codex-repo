# Technical Concerns & Debt

## Known Issues
- None so far (Greenfield initialization phase).

## Tech Debt
- **Missing Testing:** Testing infrastructure is not yet set up.
- **Basic Structure:** No folders for `components`, `hooks`, or `services` yet. Need to establish conventions when the first custom components are built.

## Performance Considerations
- Ensure heavy animations continue to rely on `react-native-reanimated` worklets to avoid bridging overhead.
- Keep `nativewind` class processing fast by maintaining an organized `tailwind.config.js`.
