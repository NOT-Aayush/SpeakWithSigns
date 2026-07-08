# 🤟 SpeakWithSigns

SpeakWithSigns is a real-time communication platform designed to bridge the gap between sign language users and non-signers. The application recognizes American Sign Language (ASL) hand gestures using computer vision and deep learning, converting them into text.

The project was built to make everyday conversations more accessible through AI-powered gesture recognition.

---

## 📷 Demo

 <img width="1914" height="945" alt="sws" src="https://github.com/user-attachments/assets/ef41274f-f5fd-4b95-80bd-76cde93e4b33" />

---

## ✨ Features

- 🤟 Real-time ASL alphabet recognition
- 📷 Live webcam-based hand tracking
- 🧠 Deep learning gesture classification
- 📝 Sign-to-text conversion
- 👤 Face recognition for user identification
- ⚡ Real-time predictions in the browser
- 💬 Accessible communication interface

---

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- Vite
- TensorFlow.js Lite
- MediaPipe Tasks Vision
- face-api.js

### Backend
- Node.js
- Express.js

### Machine Learning
- Python
- TensorFlow
- MediaPipe Hands
- OpenCV
- NumPy

### Database
- PostgreSQL

---

## 🧠 Model Pipeline

```
Webcam
   │
   ▼
MediaPipe Hands
   │
   ▼
21 Hand Landmarks
(63 Features)
   │
   ▼
TensorFlow Model
   │
   ▼
Predicted ASL Character
   │
   ▼
Display on Screen
```

---

## Dataset

- ASL Alphabet Dataset
- 29 Classes
  - A–Z
  - Space
  - Delete
  - Nothing

---

## Face Recognition Pipeline

```
Camera
   │
   ▼
Face Detection
(face-api.js)
   │
   ▼
128-D Face Descriptor
   │
   ▼
Database Matching
   │
   ▼
Recognized User
```

---

## Project Structure

```
SpeakWithSigns
├── client/
├── server/
├── model/
└── README.md
```

---

## What I Learned

This project helped me gain experience with:

- Computer vision
- Deep learning model training
- TensorFlow deployment
- MediaPipe integration
- Browser-based AI inference
- Face recognition
- Real-time web applications
- Express backend development

---

## Future Improvements

- Word-level recognition
- Additional sign languages
- Text-to-sign translation

---

## 📸 Screenshots

Add screenshots for:
- <img width="1913" height="875" alt="image" src="https://github.com/user-attachments/assets/65893aba-f291-4125-bdf7-31b8e8b0ee54" />
- <img width="1890" height="863" alt="image" src="https://github.com/user-attachments/assets/01a8ad06-7223-4ecf-8b25-ae787ff63ac4" />
- <img width="1912" height="875" alt="image" src="https://github.com/user-attachments/assets/4525f860-69c9-4993-b463-8cb8388800c9" />


---

## Author

**Aayush Pandey**

🌐 Portfolio: https://aayushpandey.in
