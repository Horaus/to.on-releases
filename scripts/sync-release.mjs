import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const candidateDir = process.argv[2];
if (!candidateDir || !fs.existsSync(candidateDir)) {
  console.error("Usage: node scripts/sync-release.mjs <path-to-candidate-dir>");
  process.exit(1);
}

function sha256(filePath) {
  const hash = crypto.createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

const infoPath = path.join(candidateDir, "candidate-info.json");
const candidateInfo = fs.existsSync(infoPath) ? JSON.parse(fs.readFileSync(infoPath, "utf8")) : {};
const version = candidateInfo.version || "0.3.336c";

const rootDir = path.resolve(import.meta.dirname, "..");
const releaseDir = path.join(rootDir, "releases", `v${version}`);
fs.mkdirSync(releaseDir, { recursive: true });

// Locate DMG and ASAR in candidate dir
const dmgFiles = fs.readdirSync(candidateDir).filter(f => f.endsWith(".dmg"));
if (!dmgFiles.length) {
  console.error("No DMG file found in candidate dir!");
  process.exit(1);
}

const dmgSource = path.join(candidateDir, dmgFiles[0]);
const targetDmgName = `to.on-${version}.dmg`;
const targetDmgPath = path.join(releaseDir, targetDmgName);
console.log(`Copying DMG: ${dmgSource} -> ${targetDmgPath}`);
fs.copyFileSync(dmgSource, targetDmgPath);

const asarSource = path.join(candidateDir, "mac", "to.on.app", "Contents", "Resources", "app.asar");
if (!fs.existsSync(asarSource)) {
  console.error("No app.asar found in candidate app dir!");
  process.exit(1);
}
const targetAsarName = `app-${version}.asar`;
const targetAsarPath = path.join(releaseDir, targetAsarName);
console.log(`Copying ASAR: ${asarSource} -> ${targetAsarPath}`);
fs.copyFileSync(asarSource, targetAsarPath);

const dmgHash = sha256(targetDmgPath);
const asarHash = sha256(targetAsarPath);
const asarSize = fs.statSync(targetAsarPath).size;

const shaSumsContent = `${dmgHash}  ${targetDmgName}\n${asarHash}  ${targetAsarName}\n`;
fs.writeFileSync(path.join(releaseDir, "SHA256SUMS.txt"), shaSumsContent);

const versionManifest = {
  version,
  releasedAt: new Date().toISOString(),
  downloadUrl: `https://github.com/Horaus/to.on-releases/releases/download/v${version}/${targetDmgName}`,
  asarUrl: `https://github.com/Horaus/to.on-releases/releases/download/v${version}/${targetAsarName}`,
  asarSha256: asarHash,
  asarSize,
  changelog: candidateInfo.description || `to.on Studio v${version} Release`
};

fs.writeFileSync(path.join(releaseDir, "version.json"), JSON.stringify(versionManifest, null, 2) + "\n");
fs.writeFileSync(path.join(rootDir, "version.json"), JSON.stringify(versionManifest, null, 2) + "\n");

console.log("\nSync release completed successfully!");
console.log("Version:", version);
console.log("DMG SHA256 :", dmgHash);
console.log("ASAR SHA256:", asarHash);
