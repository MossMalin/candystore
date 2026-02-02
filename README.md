# Candy store

This is a store for TypeScript training purpose. You will not get any candy if you place an order.

## Public application url

[Candystore](https://moss-candystore.netlify.app/)

## 🔴 Known issues

### Input Validation

`CheckoutPage.tsx` No custom validation for input field is implemented. Form is submitted without client-side validation. Email, postal code, and other fields should be validated before submission.

### XSS Vulnerability

`ProductPage.tsx` Using `dangerouslySetInnerHTML` without sanitization for product descriptions is a security risk but was cleared that it is OK for this assignment.

### Missing accessibility

Using HTML input validation for error messages in forms

### Magic strings for API endpoints

Have not created a constants file

### No transitions

No transition implemented for example when fold out of Cart.

### Missing unit tests

All unit tests has not been created
