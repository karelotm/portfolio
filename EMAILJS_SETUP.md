# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form functional and send emails to karim00el@gmail.com.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account (karim00el@gmail.com)
5. Note down the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Copy your **Public Key** (e.g., `user_abc123def456`)

## Step 5: Update JavaScript Configuration

Open `assets/js/main.js` and update these lines:

```javascript
const EMAILJS_SERVICE_ID = 'your_service_id_here'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'your_template_id_here'; // Replace with your template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Replace with your public key
```

## Step 6: Test the Form

1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email (karim00el@gmail.com) for the message

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined" error**
   - Make sure the EmailJS script is loaded before your main.js
   - Check your internet connection

2. **"Service not found" error**
   - Verify your Service ID is correct
   - Make sure the service is active in your EmailJS dashboard

3. **"Template not found" error**
   - Verify your Template ID is correct
   - Make sure the template is published

4. **Emails not received**
   - Check your spam folder
   - Verify the email address in the template
   - Check EmailJS dashboard for error logs

### Free Plan Limits:

- 200 emails per month
- 2 email services
- 2 email templates

## Alternative: Netlify Forms (If using Netlify)

If you're hosting on Netlify, you can also use Netlify Forms:

1. Add `netlify` attribute to your form:
```html
<form class="space-y-4" novalidate netlify>
```

2. Remove EmailJS code and use Netlify's built-in form handling

## Alternative: Formspree

You can also use Formspree for form handling:

1. Go to [Formspree.io](https://formspree.io/)
2. Create a free account
3. Create a new form
4. Update your form action:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Security Notes

- Never expose your EmailJS private keys in client-side code
- The public key is safe to use in frontend code
- Consider implementing rate limiting for production use
- Always validate form data on the server side for production

## Support

If you need help with the setup, you can:
- Check EmailJS documentation: https://www.emailjs.com/docs/
- Contact EmailJS support
- Check the browser console for error messages
