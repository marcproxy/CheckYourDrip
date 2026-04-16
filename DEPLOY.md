# Guide de déploiement — CheckYourDrip Web

## Architecture

```
Vercel (Next.js)          Railway (FastAPI + YOLO)
├── Page d'accueil    →   ├── POST /detect  (inférence YOLO)
├── Page caméra       →   ├── POST /save    (PG + Cloudinary + MongoDB)
└── Page historique   ←   └── GET  /history (MongoDB logs)
```

---

## 1. Déployer le backend sur Railway

### Prérequis
- Compte [Railway](https://railway.app) (gratuit, 5$/mois crédits offerts)
- Le fichier modèle `runs/detect/models/trained/final_model10/weights/best.pt`

### Étapes

1. **Copier le modèle dans le dossier backend :**
   ```bash
   mkdir -p web/backend/model
   cp runs/detect/models/trained/final_model10/weights/best.pt web/backend/model/best.pt
   ```

2. **Créer un repo GitHub** pour le projet (ou utiliser un existant)

3. **Sur Railway :**
   - New Project → Deploy from GitHub repo
   - Sélectionner le repo, choisir le dossier `web/backend` comme **Root Directory**
   - Railway détecte automatiquement le `Dockerfile`

4. **Ajouter les variables d'environnement** dans Railway (Settings → Variables) :
   ```
   DATABASE_URL=...
   MONGO_URI=...
   MONGO_DB=db-CheckYourDrip
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   MODEL_PATH=model/best.pt
   ```

5. **Copier l'URL publique** Railway (ex: `https://checkyourdrip-api.railway.app`)

---

## 2. Déployer le frontend sur Vercel

1. **Sur Vercel :**
   - New Project → Import Git Repository
   - Sélectionner le repo, choisir `web/frontend` comme **Root Directory**
   - Framework Preset: **Next.js**

2. **Ajouter la variable d'environnement** dans Vercel :
   ```
   NEXT_PUBLIC_API_URL=https://checkyourdrip-api.railway.app
   ```
   *(remplacer par votre URL Railway réelle)*

3. **Deploy** → Vercel génère une URL publique (ex: `https://checkyourdrip.vercel.app`)

---

## 3. Test en local

### Backend
```bash
cd web/backend
mkdir -p model
cp ../../runs/detect/models/trained/final_model10/weights/best.pt model/best.pt
cp ../../.env .env          # copie les variables existantes
pip install -r requirements.txt
uvicorn main:app --reload
# API disponible sur http://localhost:8000
```

### Frontend
```bash
cd web/frontend
# .env.local contient déjà NEXT_PUBLIC_API_URL=http://localhost:8000
npm install
npm run dev
# App disponible sur http://localhost:3000
```

---

## Notes importantes

- **Modèle non commité :** le fichier `best.pt` (~6 MB) est dans `.gitignore` par défaut.
  Ajoutez-le manuellement via Railway CLI ou incluez-le dans le repo si < 100 MB.
- **CORS :** l'API accepte toutes les origines en dev. En production, remplacer `allow_origins=["*"]`
  par votre domaine Vercel dans `main.py`.
- **Délai froid Railway :** sur le tier gratuit, le service s'endort après 30 min d'inactivité.
  Premier appel ~5s de latence au réveil.
