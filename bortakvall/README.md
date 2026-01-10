# Inlämningsuppgift 2

## Public application url

[Bortakväll](https://ornate-vacherin-704939.netlify.app/)

## Issues

I have added comments in the code for where I had issues. Search for `Issue:` to find them.

## Images and color schema

ChatGPT was nice and created images and colors for the site [Link to ChatGPT](https://chatgpt.com/share/69611e41-dea4-8002-8af3-18c9c64bb81a). I ended up removing some of the colors that I did not use.

## First Code Review Findings CoPilot

### ✅ Strengths

1. **Good Project Structure** - Clear separation of concerns with organized folders (components, pages, services, hooks, context, types)
2. **Type Safety** - Excellent TypeScript usage throughout, including generic types for API responses
3. **Cart Management** - Well-implemented context API with localStorage persistence
4. **Accessibility** - Good use of semantic HTML, ARIA labels, and visually hidden elements
5. **Styling** - Well-organized SCSS with utilities, breakpoints, and reusable mixins
6. **Error Handling** - Centralized error handler utility

### 🔴 Critical Issues

#### 1. Uncontrolled Form Inputs - `Input.tsx` ✅ Fixed

The `Input` component receives a `value` prop but doesn't have an `onChange` handler, making it uncontrolled.

**Recommendation:** Add `onChange` callback prop to make inputs controlled.

#### 2. Form Action in CheckoutPage - Not React Best Practice ✅ Fixed

Using `formAction` with `FormData` works, but consider using `useState` for better control and validation.

**Recommendation:** Refactor to use controlled components with state management.

#### 3. No Input Validation - `CheckoutPage.tsx` 🔴 Will not fix, using html validation

Form is submitted without client-side validation. Email, postal code, and other fields should be validated before submission.

**Recommendation:** Add validation function and display error messages to users.

#### 4. XSS Vulnerability - `ProductPage.tsx` 🔴 Will not fix, package suggested had 1 High vulnerability and it was ok to use it like this

Using `dangerouslySetInnerHTML` without sanitization for product descriptions is a security risk.

**Recommendation:** Use a sanitization library like DOMPurify before rendering HTML content.

#### 5. Missing Null Checks - `ProductListPage.tsx` ✅ Fixed

Code assumes `getProductsData?.data` is always an array without proper validation.

**Recommendation:** Add array checks before accessing/mapping data.

### 🟡 Important Issues

#### 6. Hard-coded API/Image URLs ✅ Fixed

Image URLs and API endpoints are hard-coded with `https://www.bortakvall.se`.

**Recommendation:** Move to environment variables (`.env` files with `VITE_` prefix).

#### 7. No Loading/Error States 🔴 Will not fix, user get an alert when something goes wrong

Pages don't show loading indicators or error messages to users during data fetching.

**Recommendation:** Add loading spinners and error messages throughout the app.

#### 8. Navigation uses `window.location` - Anti-pattern ✅ Fixed

Multiple components use `window.location.href` instead of React Router's navigation.

**Recommendation:** Use `useNavigate()` hook from React Router instead.

#### 9. Inefficient Calculations - `CartProvider.tsx` ✅ Fixed

The `totalCost` is recalculated every render without memoization.

**Recommendation:** Use `useMemo` to optimize calculations.

#### 10. Missing Query Retry Logic - `main.tsx` ✅ Fixed

Query client is not configured with retry logic for failed requests.

**Recommendation:** Add retry configuration and stale time settings to QueryClient.

### 🟢 Minor Issues

- Inconsistent imports (mix of default and named imports) 🔴 Will not fix
- Missing accessibility for error messages in forms 🔴 Will not fix
- TODO comment about showing items in basket (already implemented, can be removed) ✅ Fixed
- Magic strings for API endpoints - consider creating constants file 🔴 Will not fix
