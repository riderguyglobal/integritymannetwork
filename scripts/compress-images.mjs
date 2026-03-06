/**
 * Image Compression Script
 * Converts large PNG files to optimized WebP and creates optimized JPG versions.
 * Run: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = 'public/images';
const QUALITY_WEBP = 80;
const QUALITY_JPG = 82;
const MAX_WIDTH = 1920;  // Max width for any image
const MAX_HEIGHT = 1080; // Max height for any image

async function compressImages() {
  const files = await readdir(IMAGES_DIR);
  
  for (const file of files) {
    const filePath = join(IMAGES_DIR, file);
    const ext = extname(file).toLowerCase();
    const name = basename(file, ext);
    const info = await stat(filePath);
    const sizeMB = (info.size / (1024 * 1024)).toFixed(2);

    // Skip already-optimized small files (under 500KB)
    if (info.size < 500 * 1024) {
      console.log(`⏭  ${file} (${sizeMB} MB) — already small, skipping`);
      continue;
    }

    // Skip non-image files
    if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) continue;

    try {
      const image = sharp(filePath);
      const metadata = await image.metadata();

      // Determine if resize is needed
      const needsResize = (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT);
      
      let pipeline = sharp(filePath);
      
      if (needsResize) {
        pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // Convert PNGs to optimized JPG (since these are photos, not graphics with transparency)
      if (ext === '.png') {
        const outputPath = join(IMAGES_DIR, `${name}.jpg`);
        const backupPath = join(IMAGES_DIR, `${name}.original${ext}`);
        
        await pipeline
          .jpeg({ quality: QUALITY_JPG, mozjpeg: true })
          .toFile(outputPath + '.tmp');
        
        // Backup original and replace
        await rename(filePath, backupPath);
        await rename(outputPath + '.tmp', outputPath);
        
        const newInfo = await stat(outputPath);
        const newSizeMB = (newInfo.size / (1024 * 1024)).toFixed(2);
        const savings = ((1 - newInfo.size / info.size) * 100).toFixed(0);
        
        console.log(`✅ ${file} (${sizeMB} MB) → ${name}.jpg (${newSizeMB} MB) — ${savings}% smaller`);
      } else {
        // Optimize existing JPGs in-place
        const outputPath = filePath + '.tmp';
        
        await pipeline
          .jpeg({ quality: QUALITY_JPG, mozjpeg: true })
          .toFile(outputPath);
        
        const newInfo = await stat(outputPath);
        
        if (newInfo.size < info.size) {
          const backupPath = join(IMAGES_DIR, `${name}.original${ext}`);
          await rename(filePath, backupPath);
          await rename(outputPath, filePath);
          
          const newSizeMB = (newInfo.size / (1024 * 1024)).toFixed(2);
          const savings = ((1 - newInfo.size / info.size) * 100).toFixed(0);
          console.log(`✅ ${file} (${sizeMB} MB) → (${newSizeMB} MB) — ${savings}% smaller`);
        } else {
          // Already optimized, remove temp
          const { unlink } = await import('fs/promises');
          await unlink(outputPath);
          console.log(`⏭  ${file} (${sizeMB} MB) — already optimized`);
        }
      }
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`);
    }
  }
  
  // Generate WebP versions of all final images for optional <picture> use
  console.log('\n--- Generating WebP versions ---\n');
  
  const finalFiles = await readdir(IMAGES_DIR);
  for (const file of finalFiles) {
    const ext = extname(file).toLowerCase();
    const name = basename(file, ext);
    
    // Skip originals, skip non-images, skip existing webps
    if (name.includes('.original') || ext === '.webp') continue;
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    
    const filePath = join(IMAGES_DIR, file);
    const webpPath = join(IMAGES_DIR, `${name}.webp`);
    
    try {
      await sharp(filePath)
        .resize(MAX_WIDTH, MAX_HEIGHT, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: QUALITY_WEBP })
        .toFile(webpPath);
      
      const origInfo = await stat(filePath);
      const webpInfo = await stat(webpPath);
      const origMB = (origInfo.size / (1024 * 1024)).toFixed(2);
      const webpMB = (webpInfo.size / (1024 * 1024)).toFixed(2);
      
      console.log(`✅ ${file} (${origMB} MB) → ${name}.webp (${webpMB} MB)`);
    } catch (err) {
      console.error(`❌ ${file} webp: ${err.message}`);
    }
  }
  
  console.log('\n✨ Image compression complete!');
}

compressImages().catch(console.error);
