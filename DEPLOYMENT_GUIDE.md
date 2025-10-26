# Portfolio Deployment Guide

Your portfolio has been successfully deployed to GitHub! Here's how to make it live and accessible to the world.

## 🚀 Current Status

✅ **Repository**: https://github.com/karelotm/portfolio  
✅ **Files Uploaded**: All portfolio files are now on GitHub  
✅ **Git Setup**: Local repository connected to GitHub  

## 🌐 Enable GitHub Pages (Make it Live)

### Step 1: Go to Repository Settings
1. Visit your repository: https://github.com/karelotm/portfolio
2. Click on the **"Settings"** tab (at the top of the repository)

### Step 2: Enable GitHub Pages
1. Scroll down to the **"Pages"** section in the left sidebar
2. Under **"Source"**, select **"Deploy from a branch"**
3. Choose **"master"** branch
4. Select **"/ (root)"** folder
5. Click **"Save"**

### Step 3: Wait for Deployment
- GitHub will build and deploy your site
- This usually takes 1-5 minutes
- You'll see a green checkmark when it's ready

### Step 4: Access Your Live Site
Your portfolio will be available at:
**https://karelotm.github.io/portfolio**

## 📧 Set Up Contact Form (EmailJS)

### Quick Setup:
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Create a free account
3. Follow the detailed guide in `EMAILJS_SETUP.md`
4. Update the configuration in `assets/js/main.js`

### Current Fallback:
- Contact form works with mailto fallback
- Users can still contact you directly

## 🔄 Future Updates

### To Update Your Portfolio:
```bash
# Make changes to your files
# Then run these commands:

git add .
git commit -m "Update: Description of changes"
git push origin master
```

### GitHub Pages will automatically update within 1-5 minutes!

## 📱 Test Your Live Site

### Checklist:
- [ ] Site loads at https://karelotm.github.io/portfolio
- [ ] All sections display correctly
- [ ] Dark mode toggle works
- [ ] Language switcher works (EN/FR)
- [ ] Resume download works
- [ ] Contact form works (with fallback)
- [ ] Mobile responsive design
- [ ] All animations work smoothly

## 🛠️ Custom Domain (Optional)

If you want a custom domain like `karimelotmani.com`:

1. **Buy a domain** from providers like:
   - Namecheap
   - GoDaddy
   - Google Domains

2. **Configure DNS**:
   - Add a CNAME record pointing to `karelotm.github.io`

3. **Update GitHub Pages**:
   - In repository Settings → Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

## 📊 Analytics (Optional)

### Google Analytics:
1. Create a Google Analytics account
2. Get your tracking ID
3. Add this to your `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🔒 Security & Performance

### Current Security:
- ✅ HTTPS enabled (GitHub Pages default)
- ✅ No sensitive data exposed
- ✅ Form validation implemented

### Performance:
- ✅ Optimized images
- ✅ Minified CSS/JS (via CDN)
- ✅ Fast loading times

## 🆘 Troubleshooting

### Common Issues:

1. **Site not loading**:
   - Check if GitHub Pages is enabled
   - Wait 5-10 minutes for deployment
   - Check repository settings

2. **Contact form not working**:
   - Set up EmailJS (see EMAILJS_SETUP.md)
   - Check browser console for errors
   - Test with mailto fallback

3. **Images not loading**:
   - Check file paths are correct
   - Ensure images are in the repository
   - Use relative paths

4. **Styling issues**:
   - Check if CSS file is loading
   - Verify Tailwind CSS CDN is working
   - Check browser console for errors

## 📞 Support

If you need help:
- Check GitHub Pages documentation
- Review the EMAILJS_SETUP.md guide
- Check browser console for errors
- Test in different browsers

## 🎉 Congratulations!

Your professional portfolio is now live and ready to impress potential clients and employers!

**Live URL**: https://karelotm.github.io/portfolio  
**Repository**: https://github.com/karelotm/portfolio

---

*Last updated: $(date)*
