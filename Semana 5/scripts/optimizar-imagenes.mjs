import { readdir, readFile, writeFile, unlink, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const images = path.join(root, 'src', 'assets', 'images');
const folders = ['actividades', 'destinos', 'hero', 'hoteles'];
const sources = path.join(root, 'src');

async function walk(directory, extensions = null) {
  const results = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...await walk(file, extensions));
    else if (!extensions || extensions.some(ext => entry.name.endsWith(ext))) results.push(file);
  }
  return results;
}

const sourceFiles = await walk(sources, ['.jsx', '.js', '.css', '.html']);
const sourceContent = new Map();
for (const file of sourceFiles) sourceContent.set(file, await readFile(file, 'utf8'));

let filesCount = 0;
let originalBytes = 0;
let optimizedBytes = 0;
const replacements = [];
const pendingDeletes = [];

for (const folder of folders) {
  const location = path.join(images, folder);
  const originals = (await readdir(location)).filter(file => file.toLowerCase().endsWith('.png'));

  for (const filename of originals) {
    const input = path.join(location, filename);
    const outputName = filename.replace(/\.png$/i, '.webp');
    const output = path.join(location, outputName);
    const references = [...sourceContent.values()].some(text => text.includes(filename));
    if (!references) {
      console.log(`SIN REFERENCIAS, SE CONSERVA: ${folder}/${filename}`);
      continue;
    }

    const inputSize = (await stat(input)).size;
    await sharp(input).rotate().webp({ quality: 82, effort: 5 }).toFile(output);
    const outputSize = (await stat(output)).size;
    if (outputSize <= 0) throw new Error(`Salida vacia: ${output}`);

    // Conservar PNG cuando la conversion no reduce su peso.
    if (outputSize >= inputSize) {
      await unlink(output);
      console.log(`SIN AHORRO, SE CONSERVA: ${folder}/${filename}`);
      continue;
    }

    replacements.push([filename, outputName]);
    pendingDeletes.push(input);
    filesCount++;
    originalBytes += inputSize;
    optimizedBytes += outputSize;
    console.log(`${folder}/${filename}: ${(inputSize/1048576).toFixed(2)} MB -> ${(outputSize/1048576).toFixed(2)} MB`);
  }
}

// Actualizar importaciones solo despues de conversiones exitosas.
for (const [file, originalText] of sourceContent) {
  let updated = originalText;
  for (const [before, after] of replacements) updated = updated.split(before).join(after);
  if (updated !== originalText) await writeFile(file, updated, 'utf8');
}

// Dejar las fotografias originales solo en el historial Git.
for (const file of pendingDeletes) await unlink(file);

console.log(`\nOPTIMIZADAS: ${filesCount} fotografias`);
console.log(`ORIGINAL: ${(originalBytes/1048576).toFixed(1)} MiB`);
console.log(`WEBP: ${(optimizedBytes/1048576).toFixed(1)} MiB`);
console.log(`AHORRO: ${((1-optimizedBytes/Math.max(originalBytes,1))*100).toFixed(1)}%`);