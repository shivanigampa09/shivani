import fs from 'fs';
import path from 'path';

const publicDir = 'c:/Users/gampa/OneDrive/Desktop/shivani portfolio/public';
const assetsDir = path.join(publicDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Copy user photo
const userPhotoSrc = 'C:/Users/gampa/.gemini/antigravity-ide/brain/f4dc1c82-09b3-4c75-b5b0-f2bcd5554a0f/.user_uploaded/media_1790926862712.jpg';
if (fs.existsSync(userPhotoSrc)) {
  fs.copyFileSync(userPhotoSrc, path.join(assetsDir, 'shivani-full.jpg'));
  fs.copyFileSync(userPhotoSrc, path.join(assetsDir, 'shivani-avatar.jpg'));
  console.log('Copied user photo to public/assets/shivani-full.jpg and shivani-avatar.jpg');
}

// Copy user resume PDF
const resumeSrc = 'C:/Users/gampa/.gemini/antigravity-ide/brain/f4dc1c82-09b3-4c75-b5b0-f2bcd5554a0f/.user_uploaded/media_1790843848117.pdf';
if (fs.existsSync(resumeSrc)) {
  fs.copyFileSync(resumeSrc, path.join(publicDir, 'Shivani_Gampa_Resume.pdf'));
  console.log('Copied resume PDF to public/Shivani_Gampa_Resume.pdf');
}

// Check for project images from Anandainn / Convention
const conventionSrc = 'C:/Users/gampa/OneDrive/Pictures/Camera Roll/Photos anandainn/Convention/Wedding Mandap Stage.png';
if (fs.existsSync(conventionSrc)) {
  fs.copyFileSync(conventionSrc, path.join(assetsDir, 'aishwarya-convention.png'));
  console.log('Copied convention photo to public/assets/aishwarya-convention.png');
}
const hallSrc = 'C:/Users/gampa/OneDrive/Pictures/Camera Roll/Photos anandainn/Banquet Hall/Banquet Hall 1.png';
if (fs.existsSync(hallSrc)) {
  fs.copyFileSync(hallSrc, path.join(assetsDir, 'aishwarya-hall.png'));
  console.log('Copied hall photo to public/assets/aishwarya-hall.png');
}
