<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Poetry Mentor app

Ứng dụng hiện hỗ trợ:
- **Gemini miễn phí qua Puter.js** (ưu tiên khi SDK khả dụng, dùng model nhanh: `gemini-3.1-flash-lite-preview` -> `gemini-3-flash-preview`).
- **Text AI fallback qua Pollinations** (`openai-large` -> `openai`) khi Puter không khả dụng.
- **Gemini miễn phí qua Puter.js** (ưu tiên khi SDK khả dụng).
- **Text AI fallback qua Pollinations** (`openai-large` -> `openai`) khi Puter không khả dụng.
Ứng dụng đã được đổi sang:
- **Text AI miễn phí** qua Pollinations (fallback model: `openai-large` -> `openai`) — không cần Gemini API key.
- **Text AI miễn phí** qua Pollinations (`openai-large`) — không cần Gemini API key.
- **Voice AI** qua ElevenLabs (voice ID mặc định: `jdlxsPOZOHdGEfcItXVu`), tự fallback sang Web Speech nếu TTS API lỗi.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy on Vercel

1. Import repo vào Vercel.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Deploy.

## Deploy notes

- Đã nhúng Puter SDK ở `index.html` qua `https://js.puter.com/v2/`.
- Chat Puter bật streaming realtime để phản hồi hiện ra sớm hơn (không đợi full text).
- Có thể tắt Puter và dùng Pollinations bằng cách set `VITE_USE_PUTER_GEMINI=false`.
- Có thể set `VITE_TEXT_API_BASE` (ví dụ: `https://text.pollinations.ai`) để đổi text endpoint.
- Nếu deploy static host, app mặc định gọi trực tiếp Pollinations để tránh `/api/chat` 404.
- Nếu deploy trên Vercel và muốn ưu tiên serverless route, set `VITE_USE_LOCAL_API=true`.
- Cần set `ELEVENLABS_API_KEY` (Project Settings -> Environment Variables) để bật giọng ElevenLabs.
## Deploy notes

- Đã nhúng Puter SDK ở `index.html` qua `https://js.puter.com/v2/`.
- Có thể tắt Puter và dùng Pollinations bằng cách set `VITE_USE_PUTER_GEMINI=false`.
- Có thể set `VITE_TEXT_API_BASE` (ví dụ: `https://text.pollinations.ai`) để đổi text endpoint.
- Nếu deploy static host, app mặc định gọi trực tiếp Pollinations để tránh `/api/chat` 404.
- Nếu deploy trên Vercel và muốn ưu tiên serverless route, set `VITE_USE_LOCAL_API=true`.
- Cần set `ELEVENLABS_API_KEY` (Project Settings -> Environment Variables) để bật giọng ElevenLabs.
App mặc định gọi trực tiếp Pollinations để tránh lỗi `/api/chat` 404 trên static host.

Nếu deploy trên Vercel và muốn ưu tiên serverless route, set `VITE_USE_LOCAL_API=true`.

## Deploy notes

- Không cần cấu hình `GEMINI_API_KEY` nữa.
- Có thể set `VITE_TEXT_API_BASE` (ví dụ: `https://text.pollinations.ai`) để đổi text endpoint.
- Cần set `ELEVENLABS_API_KEY` (Project Settings -> Environment Variables trên Vercel) để bật giọng ElevenLabs.
- Nếu ElevenLabs lỗi/quá hạn mức, app sẽ fallback sang `window.speechSynthesis`.
