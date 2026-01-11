# Inlämningsuppgift 2

## Aiming for

Väl Godkänd

## Public application url

[Bortakväll](https://ornate-vacherin-704939.netlify.app/)

## Deviations from assignment

### "Lägg till i varukorgen" button

Is instead a plus sign to add products

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

## Images and color schema

ChatGPT was nice and created images and colors for the site [Link to ChatGPT](https://chatgpt.com/share/69611e41-dea4-8002-8af3-18c9c64bb81a). I ended up removing some of the colors that I did not use.
