# 🚀 Streamlit Cloud Deployment Guide

## Option 1: Streamlit Community Cloud (Recommended) ⏱️ 10 minutes

### **Prerequisites**
- GitHub account
- Streamlit Cloud account (free at [share.streamlit.io](https://share.streamlit.io))
- Git installed locally

### **Step-by-Step Deployment**

#### **1. Prepare Your Repository**

```bash
# Make sure all files are committed
git add .
git commit -m "Prepare for deployment"

# Create .streamlit/config.toml for settings (optional)
mkdir -p .streamlit
```

Create `.streamlit/config.toml`:
```toml
[theme]
primaryColor = "#1f77b4"
backgroundColor = "#FFFFFF"
secondaryBackgroundColor = "#F0F2F6"
textColor = "#262730"
font = "sans serif"

[server]
headless = true
enableCORS = false
port = 8501
```

#### **2. Create .gitignore** (if not exists)

```bash
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
.venv

# Jupyter
.ipynb_checkpoints
*.ipynb_checkpoints

# Data
*.csv
*.db
*.sqlite

# Models (if too large for Git)
# Uncomment if your models are >100MB
# models/*.pkl

# IDEs
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Streamlit
.streamlit/secrets.toml
```

#### **3. Push to GitHub**

```bash
# If first time
git init
git add .
git commit -m "Initial commit: Fraud Detection Dashboard"

# Create new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/fraud-detection.git
git branch -M main
git push -u origin main

# If repo already exists
git push origin main
```

#### **4. Deploy on Streamlit Cloud**

1. **Go to** [share.streamlit.io](https://share.streamlit.io)

2. **Click** "New app"

3. **Connect GitHub** (if first time)
   - Authorize Streamlit access to your repos

4. **Configure deployment:**
   ```
   Repository: YOUR_USERNAME/fraud-detection
   Branch: main
   Main file path: app.py
   ```

5. **Advanced Settings** (if needed):
   - Python version: 3.11
   - Click "Save"

6. **Deploy!**
   - Streamlit will install dependencies and launch
   - Takes ~2-5 minutes first time
   - You'll get a URL: `https://YOUR_USERNAME-fraud-detection-app-xxxxx.streamlit.app`

#### **5. Verify Deployment**

Visit your app URL and check:
- [ ] Dashboard loads without errors
- [ ] All visualizations appear
- [ ] Interactive features work
- [ ] Data loads correctly

### **Troubleshooting**

**Issue**: "Module not found"
```bash
# Make sure requirements.txt is in repo root
# Check all packages are listed with versions
```

**Issue**: "File not found"
```python
# Use relative paths, not absolute
# ❌ BAD: '/Users/gloria/Documents/...'
# ✅ GOOD: 'models/xgboost_fraud_detector.pkl'
```

**Issue**: "App exceeds memory limit"
```python
# Use @st.cache_data for expensive operations
@st.cache_data
def load_data():
    return pd.read_csv('data.csv')
```

**Issue**: "Models too large" (>1GB)
```bash
# Use Git LFS or load from external storage
# Or use lighter model (compress with joblib compression)
```

---

## Option 2: Docker Deployment (Local/Production) ⏱️ 5 minutes

### **Quick Start**

```bash
# Build and run
docker-compose up --build

# Access at http://localhost:8501
```

### **Stop Application**

```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## Option 3: Local Development

### **Setup**

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/fraud-detection.git
cd fraud-detection

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### **Run Dashboard**

```bash
streamlit run app.py
```

### **Run Notebooks**

```bash
jupyter notebook
# Open desired notebook (*.ipynb)
```

---

## Updating Deployed App

### **Streamlit Cloud**
```bash
# Just push changes to GitHub
git add .
git commit -m "Update dashboard"
git push origin main

# Streamlit Cloud auto-redeploys (takes 1-2 minutes)
```

### **Docker**
```bash
# Rebuild image
docker-compose up --build
```

---

## Managing Secrets (if needed)

### **Streamlit Cloud Secrets**

1. Go to app settings on Streamlit Cloud
2. Click "Secrets"
3. Add secrets in TOML format:

```toml
# .streamlit/secrets.toml (NOT committed to Git)
[database]
host = "your-db-host.com"
username = "your-username"
password = "your-password"
```

4. Access in code:
```python
import streamlit as st
db_host = st.secrets["database"]["host"]
```

---

## Custom Domain (Optional)

### **Streamlit Cloud**
1. Go to app settings
2. Click "Manage app"
3. Enter custom domain
4. Update DNS records (follow instructions)

**Example**: `fraud-detection.yourdomain.com`

---

## Monitoring & Maintenance

### **Check App Health**
- Streamlit Cloud dashboard shows:
  - Uptime status
  - Resource usage
  - Error logs
  - Viewer analytics

### **View Logs**
```bash
# Streamlit Cloud: Click "Manage app" → "Logs"

# Docker: 
docker-compose logs -f
```

### **Performance Tips**
```python
# Cache data loading
@st.cache_data
def load_model():
    return joblib.load('models/model.pkl')

# Cache resource-intensive computations
@st.cache_resource
def init_connection():
    return connection

# Use session state for user inputs
if 'threshold' not in st.session_state:
    st.session_state.threshold = 0.5
```

---

## Sharing Your App

### **Public URL**
```
https://YOUR_USERNAME-fraud-detection-app-xxxxx.streamlit.app
```

### **In Resume/LinkedIn**
```markdown
🔗 [Live Demo](https://your-app-url.streamlit.app)
```

### **In README**
```markdown
## 🎨 Live Demo
Try the interactive dashboard: [Fraud Detection System](https://your-app-url.streamlit.app)
```

---

## Cost Comparison

| Platform | Cost | Pros | Cons |
|----------|------|------|------|
| **Streamlit Cloud** | Free | Easy, auto-deploy, no config | Public only (free tier) |
| **Docker Local** | Free | Full control, private | Manual updates |
| **Heroku** | $7/mo | Custom domain, always-on | More setup |
| **AWS/GCP** | ~$10/mo | Production-grade, scalable | Complex setup |

**Recommendation**: Start with Streamlit Cloud (free), upgrade if needed.

---

## Production Checklist

- [ ] GitHub repository is public (or private with Team plan)
- [ ] requirements.txt is complete and tested
- [ ] No absolute file paths in code
- [ ] Secrets managed properly (not in Git)
- [ ] Error handling implemented
- [ ] Performance optimized (caching)
- [ ] README has live demo link
- [ ] LinkedIn/resume updated with link

---

## Getting Help

### **Streamlit Community**
- Forum: [discuss.streamlit.io](https://discuss.streamlit.io)
- Docs: [docs.streamlit.io](https://docs.streamlit.io)
- Gallery: [streamlit.io/gallery](https://streamlit.io/gallery)

### **Common Issues**
- Search Streamlit forums
- Check GitHub issues
- Review Streamlit docs

---

## Next Steps After Deployment

1. ✅ Test deployed app thoroughly
2. ✅ Share URL in your portfolio
3. ✅ Add to LinkedIn featured section
4. ✅ Update resume with live demo link
5. ✅ Share on Twitter/LinkedIn
6. ✅ Get feedback and iterate

---

**Your deployed app is now live! 🎉**

Share it with confidence and watch the interview requests roll in!

