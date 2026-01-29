# Candy store

TypeScript assignment 2

## Public application url

[Candystore](https://moss-candystore.netlify.app/)

## 🔴 Known issues

### Input Validation

`CheckoutPage.tsx` No custom validation for input field is implemented. Form is submitted without client-side validation. Email, postal code, and other fields should be validated before submission.

### XSS Vulnerability

`ProductPage.tsx` Using `dangerouslySetInnerHTML` without sanitization for product descriptions is a security risk but was cleared that it is OK for this assignment.

### No Loading

Pages don't show loading indicators to users during data fetching.

### Inconsistent imports

Mix of default and named imports

### Missing accessibility

Using HTML input validation for error messages in forms

### Magic strings for API endpoints

Have not created a constants file

### No transitions

No transition implemented for example when fold out of Cart.

### No unit tests

No unit test has been created

## Images and color schema

ChatGPT was nice and created images and colors for the site [Link to ChatGPT](https://chatgpt.com/share/69611e41-dea4-8002-8af3-18c9c64bb81a). I ended up removing some of the colors that I did not use.
