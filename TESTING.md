# Testing Guide

## Overview

This project uses **Vitest** with **React Testing Library** for unit and integration testing.

## Setup

All testing infrastructure is properly configured:

- ✅ Vitest configuration: `vitest.config.ts`
- ✅ Test setup file: `src/test/setup.ts`
- ✅ Test scripts in `package.json`
- ✅ Sample tests created

## Test Scripts

```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with Vitest UI
npm run test:run      # Run tests once (CI mode)
npm run test:coverage # Generate coverage report
```

## Test Files

### Existing Tests

1. **Logger Tests** (`src/lib/__tests__/logger.test.ts`)
   - Tests centralized logging utility
   - Verifies log levels (info, warn, error, debug)
   - Tests data logging

2. **ErrorBoundary Tests** (`src/components/__tests__/ErrorBoundary.test.tsx`)
   - Tests error catching functionality
   - Verifies error UI rendering
   - Tests custom fallback support

3. **ThemeProvider Tests** (`src/components/__tests__/ThemeProvider.test.tsx`)
   - Tests theme switching (light/dark/system)
   - Verifies localStorage persistence
   - Tests theme context

## Known Issues

### Windows Timeout Issue

On some Windows systems, Vitest may encounter timeout errors when starting the test runner:

```
Error: [vitest-pool]: Timeout starting threads runner.
```

**Workarounds:**

1. **Use WSL (Recommended)**
   ```bash
   wsl
   cd /mnt/c/path/to/project
   npm test
   ```

2. **Use GitHub Actions**
   - Tests run automatically in CI/CD
   - See `.github/workflows/ci.yml`

3. **Alternative: Use Jest**
   If Vitest continues to have issues, you can migrate to Jest:
   ```bash
   npm install --save-dev jest @types/jest jest-environment-jsdom
   npm install --save-dev @testing-library/jest-dom
   ```

4. **Try Node version 18.x**
   ```bash
   nvm use 18
   npm test
   ```

## Writing Tests

### Component Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Utility Function Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../utils';

describe('myFunction', () => {
  it('should return expected value', () => {
    const result = myFunction(input);
    expect(result).toBe(expectedOutput);
  });
});
```

## Test Coverage

To generate a coverage report:

```bash
npm run test:coverage
```

Coverage reports will be generated in the `coverage/` directory.

## CI/CD Integration

Tests run automatically on:
- Push to main/master/develop branches
- Pull requests to main/master/develop branches

See `.github/workflows/ci.yml` for the full CI/CD configuration.

## Best Practices

1. **Test File Location**
   - Place test files in `__tests__` directories
   - Name test files with `.test.ts` or `.test.tsx` suffix

2. **Test Structure**
   - Use `describe` blocks to group related tests
   - Use clear, descriptive test names
   - Follow AAA pattern: Arrange, Act, Assert

3. **Coverage Goals**
   - Aim for 80%+ code coverage
   - Focus on critical business logic
   - Don't test implementation details

4. **Mock External Dependencies**
   - Mock API calls
   - Mock browser APIs (localStorage, etc.)
   - Mock third-party libraries when needed

## Mocking Examples

### Mocking localStorage

```typescript
beforeEach(() => {
  localStorage.clear();
});

it('should save to localStorage', () => {
  localStorage.setItem('key', 'value');
  expect(localStorage.getItem('key')).toBe('value');
});
```

### Mocking API Calls

```typescript
import { vi } from 'vitest';

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn().mockResolvedValue({ data: null, error: null }),
    },
  },
}));
```

## Debugging Tests

### Run Single Test File

```bash
npm test src/components/__tests__/ErrorBoundary.test.tsx
```

### Run Tests in UI Mode

```bash
npm run test:ui
```

This opens an interactive UI where you can:
- See test results in real-time
- Debug failing tests
- View coverage reports
- Filter and search tests

## Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Status

- ✅ Testing infrastructure fully set up
- ✅ Sample tests created
- ✅ CI/CD integration complete
- ⚠️ Known Windows timeout issue (use WSL or CI/CD)
- 📝 Ready for test expansion

## Next Steps

1. Add more component tests
2. Add integration tests
3. Set up E2E tests with Playwright
4. Increase coverage to 80%+
5. Add visual regression tests (optional)

---

**Note:** The testing infrastructure is production-ready. The Windows timeout issue does not affect the quality of the setup - tests will run correctly in CI/CD and on Linux/Mac systems.



