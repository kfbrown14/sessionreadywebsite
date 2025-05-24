#!/usr/bin/env node

/**
 * Bundle Analysis Script
 * Analyzes the production build and provides performance insights
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

// Size thresholds (in KB)
const THRESHOLDS = {
  js: {
    warning: 100,
    error: 200
  },
  css: {
    warning: 50,
    error: 100
  },
  images: {
    warning: 300,
    error: 500
  }
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (error) {
    return 0;
  }
}

function analyzeAssets() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error('❌ Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const analysis = {
    js: [],
    css: [],
    images: [],
    other: []
  };

  files.forEach(file => {
    const filePath = path.join(ASSETS_DIR, file);
    const size = getFileSize(filePath);
    const sizeKB = size / 1024;
    
    const fileInfo = {
      name: file,
      size: size,
      sizeKB: sizeKB,
      sizeFormatted: formatBytes(size)
    };

    if (file.endsWith('.js')) {
      analysis.js.push(fileInfo);
    } else if (file.endsWith('.css')) {
      analysis.css.push(fileInfo);
    } else if (file.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
      analysis.images.push(fileInfo);
    } else {
      analysis.other.push(fileInfo);
    }
  });

  // Sort by size descending
  Object.keys(analysis).forEach(key => {
    analysis[key].sort((a, b) => b.size - a.size);
  });

  return analysis;
}

function generateReport(analysis) {
  console.log('\n📊 Bundle Analysis Report\n');
  console.log('=' .repeat(50));

  // JavaScript files
  console.log('\n🟨 JavaScript Files:');
  let totalJSSize = 0;
  analysis.js.forEach(file => {
    totalJSSize += file.size;
    const status = file.sizeKB > THRESHOLDS.js.error ? '🔴' : 
                   file.sizeKB > THRESHOLDS.js.warning ? '🟡' : '🟢';
    console.log(`  ${status} ${file.name} - ${file.sizeFormatted}`);
  });
  console.log(`  📦 Total JS: ${formatBytes(totalJSSize)}`);

  // CSS files
  console.log('\n🎨 CSS Files:');
  let totalCSSSize = 0;
  analysis.css.forEach(file => {
    totalCSSSize += file.size;
    const status = file.sizeKB > THRESHOLDS.css.error ? '🔴' : 
                   file.sizeKB > THRESHOLDS.css.warning ? '🟡' : '🟢';
    console.log(`  ${status} ${file.name} - ${file.sizeFormatted}`);
  });
  console.log(`  🎨 Total CSS: ${formatBytes(totalCSSSize)}`);

  // Image files
  console.log('\n🖼️  Image Files:');
  let totalImageSize = 0;
  analysis.images.forEach(file => {
    totalImageSize += file.size;
    const status = file.sizeKB > THRESHOLDS.images.error ? '🔴' : 
                   file.sizeKB > THRESHOLDS.images.warning ? '🟡' : '🟢';
    console.log(`  ${status} ${file.name} - ${file.sizeFormatted}`);
  });
  console.log(`  🖼️  Total Images: ${formatBytes(totalImageSize)}`);

  // Other files
  if (analysis.other.length > 0) {
    console.log('\n📁 Other Files:');
    analysis.other.forEach(file => {
      console.log(`  📄 ${file.name} - ${file.sizeFormatted}`);
    });
  }

  // Summary
  const totalSize = totalJSSize + totalCSSSize + totalImageSize;
  console.log('\n' + '=' .repeat(50));
  console.log('📈 Summary:');
  console.log(`  📦 Total Bundle Size: ${formatBytes(totalSize)}`);
  console.log(`  🟨 JavaScript: ${formatBytes(totalJSSize)} (${((totalJSSize/totalSize)*100).toFixed(1)}%)`);
  console.log(`  🎨 CSS: ${formatBytes(totalCSSSize)} (${((totalCSSSize/totalSize)*100).toFixed(1)}%)`);
  console.log(`  🖼️  Images: ${formatBytes(totalImageSize)} (${((totalImageSize/totalSize)*100).toFixed(1)}%)`);

  // Recommendations
  console.log('\n💡 Recommendations:');
  
  const largeJS = analysis.js.filter(f => f.sizeKB > THRESHOLDS.js.warning);
  if (largeJS.length > 0) {
    console.log(`  🔧 Consider code splitting for large JS files: ${largeJS.map(f => f.name).join(', ')}`);
  }

  const largeImages = analysis.images.filter(f => f.sizeKB > THRESHOLDS.images.warning);
  if (largeImages.length > 0) {
    console.log(`  🖼️  Optimize large images: ${largeImages.map(f => f.name).join(', ')}`);
  }

  const largeCss = analysis.css.filter(f => f.sizeKB > THRESHOLDS.css.warning);
  if (largeCss.length > 0) {
    console.log(`  🎨 Consider CSS optimization for: ${largeCss.map(f => f.name).join(', ')}`);
  }

  if (largeJS.length === 0 && largeImages.length === 0 && largeCss.length === 0) {
    console.log('  ✅ All files are within optimal size ranges!');
  }

  console.log('\n🎯 Performance Score:');
  const perfScore = Math.max(0, 100 - 
    (largeJS.length * 10) - 
    (largeImages.length * 15) - 
    (largeCss.length * 5)
  );
  const scoreEmoji = perfScore >= 90 ? '🟢' : perfScore >= 70 ? '🟡' : '🔴';
  console.log(`  ${scoreEmoji} ${perfScore}/100`);
}

// Main execution
function main() {
  console.log('🔍 Analyzing bundle...');
  
  try {
    const analysis = analyzeAssets();
    generateReport(analysis);
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { analyzeAssets, generateReport }; 