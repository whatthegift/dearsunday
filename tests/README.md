# Comprehensive Button Testing Suite

This test suite provides comprehensive coverage of all interactive buttons and elements across the application.

## Test Organization

### 01-navigation.spec.ts
- Homepage navigation buttons
- Sidebar and menu navigation
- Back buttons functionality
- User profile menu actions

### 02-authentication.spec.ts
- Sign in/sign up form buttons
- Form validation and submission
- Toggle between auth modes
- Loading states during authentication

### 03-relationships.spec.ts
- Add person button and dialog
- Edit/delete profile actions
- Special notes editing
- Dropdown menus in relationship cards

### 04-dates.spec.ts
- Add date functionality
- Date card actions (edit/delete)
- Calendar picker interactions
- Upcoming dates actions

### 05-gifts.spec.ts
- Gift creation and editing
- Gift history filters
- Gift card actions
- Wishlist management
- Gift recommendations

### 06-chat.spec.ts
- Chat message sending
- Tool popovers and quick suggestions
- Chat sidebar actions
- Sunday chat interactions

### 07-forms-dropdowns.spec.ts
- Select dropdown functionality
- Popover triggers
- Form validation
- Dialog footer buttons
- Filter controls

### 08-comprehensive.spec.ts
- End-to-end user flows
- Button loading states
- Error handling
- Keyboard navigation
- Mobile responsiveness
- Focus management

## Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug specific test
npm run test:debug -- tests/01-navigation.spec.ts

# Run specific test file
npx playwright test tests/05-gifts.spec.ts

# Run tests matching pattern
npx playwright test --grep "Add Gift"
```

## Test Features

✅ **Comprehensive Coverage**: All button types tested across the application  
✅ **Cross-Browser**: Tests run on Chrome, Firefox, Safari, and mobile  
✅ **Accessibility**: Keyboard navigation and focus management  
✅ **Error Handling**: Invalid input and error state testing  
✅ **Loading States**: Button states during async operations  
✅ **Mobile Testing**: Responsive button behavior  
✅ **Integration**: End-to-end user flow testing  

## Test Helpers

The `TestHelpers` class provides utilities for:
- Authentication flow
- Form filling and submission
- Navigation verification
- Toast message checking
- Dropdown testing
- Modal interactions

## Configuration

Tests are configured to:
- Run against local development server
- Take screenshots on failure
- Generate HTML reports
- Retry failed tests on CI
- Run in parallel when possible

## Debugging

When tests fail:
1. Check the HTML report: `npx playwright show-report`
2. Use debug mode: `npm run test:debug`
3. Check screenshots in `test-results/`
4. Use trace viewer for detailed debugging

## Maintenance

Update tests when:
- Adding new button functionality
- Changing UI component structure
- Modifying navigation flows
- Adding new pages or features

The test suite will catch regressions and ensure all buttons remain functional across updates.