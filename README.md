# Portfolio Website

A stunning personal portfolio website built with Next.js 14 and Python Flask.

## Features

- **Modern Design**: Clean, responsive design with dark mode support
- **Smooth Animations**: Framer Motion animations throughout
- **Contact Form**: Working contact form with email integration
- **SEO Optimized**: Built-in SEO optimization with Next.js
- **Performance**: Optimized images and lazy loading
- **TypeScript**: Full type safety with TypeScript

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

### Backend
- Python Flask
- Flask-Mail
- Flask-CORS

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file based on `.env.example` and configure your email settings.

5. Run the Flask server:
```bash
python src/app.py
```

The API will be available at [http://localhost:5000](http://localhost:5000).

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Backend (Railway/Render)

1. Create a new service on Railway or Render
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

## Customization

1. Update `frontend/lib/constants.ts` with your personal information
2. Replace placeholder images in `frontend/public/images/`
3. Modify colors in `frontend/tailwind.config.js`
4. Update email configuration in backend `.env` file

## License

MIT License - feel free to use this template for your own portfolio!