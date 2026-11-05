import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const photoManifestPath = path.join(root, "tools", "animal-photo-manifest.json");
const wikimediaSoundManifestPath = path.join(
  root,
  "tools",
  "animal-sound-manifest.json",
);
const freesoundManifestPath = path.join(root, "tools", "freesound-manifest.json");
const soundManifestExists = await fs
  .stat(wikimediaSoundManifestPath)
  .then(() => true)
  .catch(() => false);
const freesoundManifestExists = await fs
  .stat(freesoundManifestPath)
  .then(() => true)
  .catch(() => false);
const photos = JSON.parse(await fs.readFile(photoManifestPath, "utf8"));
const wikimediaSounds = soundManifestExists
  ? JSON.parse(await fs.readFile(wikimediaSoundManifestPath, "utf8"))
  : {};
const freesoundSounds = freesoundManifestExists
  ? JSON.parse(await fs.readFile(freesoundManifestPath, "utf8"))
  : {};
const sounds = { ...wikimediaSounds, ...freesoundSounds };
const playback = {};
for (const id of Object.keys(photos)) {
  const languages = {};
  for (const language of ["vi", "en"]) {
    const file = path.join(root, "assets", "audio", "animal-cards", `${id}-${language}.mp3`);
    if (await fs.stat(file).then(() => true).catch(() => false)) {
      languages[language] = `assets/audio/animal-cards/${id}-${language}.mp3`;
    }
  }
  if (Object.keys(languages).length) playback[id] = languages;
}

const media = {
  photos: Object.fromEntries(
    Object.entries(photos).map(([id, item]) => [id, item.file]),
  ),
  sounds: Object.fromEntries(
    Object.entries(sounds)
      .filter(([, item]) => item.status === "ready" && item.file)
      .map(([id, item]) => [
        id,
        {
          file: item.file,
          title: item.title,
          source: item.source,
          artist: item.artist,
          license: item.license,
        },
      ]),
  ),
  playback,
};

const mediaScript = `window.ANIMAL_MEDIA = ${JSON.stringify(media, null, 2)};\n`;
await fs.writeFile(
  path.join(root, "assets", "animal-media.js"),
  mediaScript,
  "utf8",
);

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const photoRows = Object.entries(photos)
  .map(
    ([id, item]) => `
      <tr>
        <td>${escapeHtml(id)}</td>
        <td>${escapeHtml(item.title)}</td>
        <td>${escapeHtml(item.artist || "Wikimedia contributors")}</td>
        <td>${escapeHtml(item.license || "Xem trang nguồn")}</td>
        <td><a href="${escapeHtml(item.source)}" target="_blank" rel="noreferrer">Nguồn ảnh</a></td>
      </tr>`,
  )
  .join("");

const soundRows = Object.entries(sounds)
  .filter(([, item]) => item.status === "ready")
  .map(
    ([id, item]) => `
      <tr>
        <td>${escapeHtml(id)}</td>
        <td>${escapeHtml(item.title)}</td>
        <td>${escapeHtml(item.artist || "Wikimedia contributors")}</td>
        <td>${escapeHtml(item.license || "Xem trang nguồn")}</td>
        <td><a href="${escapeHtml(item.source)}" target="_blank" rel="noreferrer">Nguồn âm thanh</a></td>
      </tr>`,
  )
  .join("");

const creditsHtml = `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nguồn ảnh và âm thanh · Bé Học Vui</title>
  <style>
    body{max-width:1180px;margin:0 auto;padding:28px 20px 60px;background:#fffaf0;color:#273443;font:16px/1.6 system-ui,sans-serif}
    a{color:#2d765a} h1{margin-bottom:8px} p{color:#66727e}
    h2{margin-top:36px} .back{display:inline-block;margin-bottom:24px;font-weight:700}
    table{width:100%;border-collapse:collapse;background:#fff;border-radius:14px;overflow:hidden}
    th,td{padding:11px 12px;border-bottom:1px solid #eee6d4;text-align:left;vertical-align:top;font-size:13px}
    th{background:#edf7f0;color:#3a735a} .wrap{overflow-x:auto;border:1px solid #e8e4d9;border-radius:14px}
  </style>
</head>
<body>
  <a class="back" href="index.html">← Về Bé Học Vui</a>
  <h1>Nguồn ảnh và âm thanh</h1>
  <p>Ảnh và một số bản ghi âm được lưu cục bộ để web hoạt động ổn định. Mỗi mục dưới đây ghi nguồn, tác giả và giấy phép từ Wikimedia Commons hoặc Freesound.</p>
  <h2>Ảnh động vật</h2>
  <div class="wrap"><table>
    <thead><tr><th>Mã</th><th>Tệp / chủ đề</th><th>Tác giả</th><th>Giấy phép</th><th>Nguồn</th></tr></thead>
    <tbody>${photoRows}</tbody>
  </table></div>
  <h2>Tiếng kêu động vật</h2>
  <div class="wrap"><table>
    <thead><tr><th>Mã</th><th>Tệp âm thanh</th><th>Tác giả</th><th>Giấy phép</th><th>Nguồn</th></tr></thead>
    <tbody>${soundRows || '<tr><td colspan="5">Chưa có dữ liệu âm thanh.</td></tr>'}</tbody>
  </table></div>
  <h2>Giọng đọc</h2>
  <p>Tiếng Việt dùng <a href="https://github.com/pnnbao97/VieNeu-TTS">VieNeu-TTS</a> với giọng Mỹ Duyên. Tiếng Anh dùng Microsoft Edge Neural TTS với giọng Aria.</p>
</body>
</html>`;

await fs.writeFile(path.join(root, "credits.html"), creditsHtml, "utf8");
console.log(
  `Built media map (${Object.keys(media.photos).length} photos, ` +
    `${Object.keys(media.sounds).length} sounds) and credits page.`,
);
