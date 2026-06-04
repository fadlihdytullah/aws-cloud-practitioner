---
name: super-refine
description: "Refine and enrich an EXISTING AWS Certified Cloud Practitioner (CLF-C02 2026) learning module already present in this repo (src/content/modules/*.mdx). Use after a generated module has been unzipped into the project and needs a quality pass, or whenever the user wants to refine, enrich, deepen, polish, or update a module, add more visuals/diagrams, generate images, create a new reusable Astro component and wire it in, or verify facts with up-to-date AWS research. Triggers: 'super-refine', 'perkaya/perdalam/poles/refine modul', 'tambah visual/diagram', 'buat komponen baru untuk materi', 'update materi modul'. Works IN the repo (edits files, creates + registers components, builds to verify), not as a zip. Obeys the writing contract in ai-instructions.md and the design system in src/styles/globals.css."
metadata:
  author: opto
  scope: project
---

# super-refine

Memoles modul belajar **AWS Certified Cloud Practitioner (CLF-C02, edisi 2026)**
yang **sudah ada di repo** menjadi berkualitas world-class: memperkaya konten,
memperkuat visual, dan membuat komponen baru bila perlu, lalu memasangnya langsung.

Bedanya dengan generator (`ai-instructions.md`): generator **membuat modul baru**
dan mengeluarkan zip. `super-refine` **mengerjakan file yang sudah ada di repo**,
mengedit di tempat, membuat + mendaftarkan komponen, lalu `build` untuk memverifikasi.

## Sumber kebenaran (baca dulu)

Sebelum mengubah apa pun:

1. **`ai-instructions.md`** (bagian antara `=== MULAI ===` dan `=== SELESAI ===`)
   adalah **kontrak penulisan**: skema frontmatter pasti (jangan tambah/kurang field),
   komponen yang sah, aturan MDX, aturan SVG figure. Patuhi 100%. Skill ini mengatur
   _apa yang dikerjakan_ (refine in-repo); kontrak itu mengatur _cara menulisnya_.
2. **`component-reference.txt`** (root repo) adalah **sumber kebenaran komponen**:
   komponen `@components` bawaan berikut prop, slot, varian, dan ikonnya (mis. `Box`
   4 varian tip/analogy/warn/exam, ikon `Chip` 8 nama). Untuk komponen yang TERDAFTAR,
   jangan mengarang prop, slot, ikon, atau varian baru. Bila butuh komponen yang BELUM
   ada, jangan memaksakan komponen lama dengan prop karangan, buat komponen baru lewat
   jalur adaptif (langkah 6) lalu dokumentasikan ke berkas ini. Berkas ini dilampirkan
   ke generator ChatGPT juga, jadi harus tetap akurat.
3. **Modul target**: `src/content/modules/NN-slug.mdx` + figure-nya di
   `src/components/figures/`. Baca utuh sebelum menilai.
4. **`src/styles/globals.css`** untuk gaya yang tersedia, dan
   `src/components/index.ts` untuk komponen yang benar-benar diekspor. Bila `index.ts`
   dan `component-reference.txt` tidak cocok (mis. ada ekspor yang belum
   terdokumentasi), itu drift, samakan keduanya.

Jangan menghafal dari ingatan; baca file aslinya karena bisa berubah.

## Alur kerja

### 1. Tentukan & pahami target

Identifikasi modul yang akan dipoles (tanya bila ambigu). Baca `.mdx`-nya, semua
figure yang di-import, dan frontmatter (`toc`, `readingTime`, `summaryHref`).
Catat: section yang tipis, analogi yang kurang, hands-on yang hilang, tempat yang
butuh diagram, klaim angka yang mungkin usang.

### 2. Riset terbaru (WAJIB sebelum menulis fakta)

Pakai **WebFetch/WebSearch** ke sumber resmi terkini: AWS Documentation, halaman
produk, AWS Pricing, Exam Guide CLF-C02. Verifikasi nama layanan, batasan, free
tier, region, dan harga. **Jangan menebak angka**; kutip dari sumber terkini.
Bila user memberi daftar episode Udemy sebagai referensi, **jangan hanya berpaku**
pada itu, eksplorasi dan elaborasi agar konten RICH (tetap selaras blueprint ujian).

### 3. Analisis celah

Tentukan peningkatan konkret yang membuat materi lebih kuat:

- Konsep kurang dalam atau tanpa "kenapa" -> tambahkan penalaran.
- Belum ada analogi konkret -> tambahkan (analogi dulu, definisi menyusul).
- Belum ada langkah hands-on / jebakan umum -> tambahkan.
- Hubungan/arsitektur/alur sulit dibayangkan -> butuh visual.
- Keseimbangan ujian: Domain 3 (34%) dan Domain 2 (30%) dapat porsi terbesar;
  setiap modul ditutup section "Ringkasan & Tips Ujian" yang memetakan ke domain.

### 4. Perkaya konten (edit di tempat)

Edit `.mdx` mengikuti kontrak: judul hero lewat prop `title`, tiap `<p>`/blok
berteks **satu baris**, sub-judul `<h3>`/`<h4>`, `<Box>` hanya 4 varian
(tip/analogy/warn/exam), `<Chip>` hanya di slot meta Hero dengan ikon dari daftar
sah, escape `&#123;`/`&#125;`, pakai `&middot;`/`&rarr;`, **tanpa em dash**.
Bahasa Indonesia penuh, gaya tenang, jelas, hangat, ringkas.

### 5. Perkuat visual

Pilih jalur paling tepat (dari paling aman):

- **SVG `.astro` (default, dijamin jalan)**: buat/upgrade `src/components/figures/<Modul>Fig<NN>.astro`
  berisi HANYA SVG (viewBox, tanpa `style=`, tanpa aset eksternal, teks gelap di
  latar terang, aksen `#2563eb`). Import lalu pakai dalam `<Figure>`.
- **Gambar raster**: HANYA bila ada tool/MCP image-generation di sesi ini. Simpan
  ke `public/img/<modul>/<nama>.png`, rujuk via `<Figure><img src="/img/..." alt="deskripsi naratif" /></Figure>`.
  Tanpa tool gambar, JANGAN paksakan; pakai SVG. **Dilarang**: kotak `<div>` warna
  sebagai pengganti gambar, atau SVG "sketsa" amatir (feTurbulence, doodle).
- **Mermaid**: repo belum merender Mermaid bawaan. Default tetap SVG. Hanya bila
  user minta eksplisit: pasang integrasi (mis. `astro-mermaid`/`rehype-mermaid`)
  di `astro.config.mjs`, jalankan, verifikasi, lalu pakai. Jika tidak, konversi
  ide diagram itu menjadi SVG figure.

Setiap diagram harus benar-benar memperjelas (arsitektur, alur, hubungan), bukan
hiasan. Beri caption naratif singkat.

### 6. Komponen adaptif (buat + daftarkan + pakai)

Bila kebutuhan konten tak tercakup komponen/`globals.css` yang ada, **buat komponen
baru dan benar-benar pasang** (bukan sekadar catatan copy-paste):

1. Buat `src/components/<Nama>.astro` (lihat komponen sejenis dulu agar pola
   konsisten; props sederhana, markup pakai class semantik).
2. Tambahkan stylenya di `src/styles/globals.css`, di area penanda **"REVAMP 2026"**
   (raw CSS dengan token dari `@theme inline`, **bukan `@apply`**, **bukan** utility
   Tailwind mentah di MDX). Pakai `var(--ink/--ink-soft/--line/--paper/--blue)` agar
   **reaktif tema** (light/sepia/dark). Teks tubuh wajib kontras **AA (>=4.5:1)** —
   jangan abu-abu terlalu terang. Hormati `prefers-reduced-motion` untuk animasi.
3. Re-export di `src/components/index.ts` agar bisa di-import dari `@components`.
4. **Dokumentasikan di `component-reference.txt`**: tambahkan satu blok `FILE:` untuk
   komponen itu (prop, slot, varian, contoh pakai) mengikuti pola entri lain, dan
   perbarui daftar "Import HANYA dari @components" di bagian atas. Tanpa ini, generator
   ChatGPT tidak akan tahu komponen itu ada (berkas itu sumber kebenarannya), jadi
   wajib sinkron dengan `index.ts`.
5. Import & gunakan komponen itu di `.mdx`.

Jangan menyisipkan utility Tailwind mentah di MDX; semua gaya tinggal di globals.css.

### 7. Sinkronkan frontmatter & TOC

Bila menambah/menghapus `<Section>`: jaga `toc` **1:1** (num/id/urutan sama),
section terakhir = ringkasan, `summaryHref = #` + id terakhir, perbarui
`readingTime`. `id` kebab-case unik. Jangan menambah atau menghapus field
frontmatter di luar skema pasti `ai-instructions.md` (title, badge, topTitle,
topSub, summary, order, target, readingTime, summaryHref, toc, footerTitle,
footerSub), hanya perbarui nilainya.

### 8. Verifikasi (wajib)

Jalankan `npm run build` sampai bersih (8+ halaman, tanpa error).

### 9. Setelah berhasil, hapus folder zip hasil generator (bila ada) agar tidak membingungkan.

<!-- Bila mengubah
tampilan, jalankan `npm run dev` dan ambil screenshot (Playwright) untuk cek
light/dark/sepia + mobile sebelum menyatakan selesai. Modul otomatis muncul di
list kurikulum homepage dan menu switcher navbar lewat `getCollection`. -->

## Aturan keras (jangan dilanggar)

- Patuhi seluruh kontrak `ai-instructions.md` (frontmatter, komponen, MDX, SVG).
- Tanpa `<h1>`/`<h2>` manual di MDX; tiap blok berteks satu baris.
- SVG mentah hanya di file `.astro`, tidak pernah di `.mdx`.
- Box hanya 4 varian; Chip hanya di slot meta Hero, ikon dari daftar sah.
- Komponen sah + prop/slot/varian = `component-reference.txt`. Bila membuat komponen
  baru, perbarui `component-reference.txt` + `index.ts` agar generator tetap sinkron.
- Component utilities di `globals.css` (token-driven, area "REVAMP 2026"), bukan
  `@apply`, bukan Tailwind mentah di MDX.
- Bahasa Indonesia penuh, tanpa em dash; angka harga/limit dari sumber terkini.
- Jangan menyentuh chrome situs (homepage list, navbar, layout) kecuali diminta;
  fokus pada materi modul dan komponen pendukungnya.

## Definition of done

- [ ] Konten lebih dalam: ada "kenapa", analogi konkret, hands-on, jebakan umum.
- [ ] Visual relevan ditambah/diperkuat; tiap diagram memperjelas, ada caption.
- [ ] (Bila perlu) komponen baru dibuat, di-style token-driven, diekspor, dipakai,
      dan didokumentasikan di `component-reference.txt` (sinkron dengan `index.ts`).
- [ ] Frontmatter & TOC sinkron; `readingTime` diperbarui; field frontmatter tak ditambah.
- [ ] Fakta diverifikasi ke sumber resmi terbaru.
- [ ] `npm run build` bersih; tampilan dicek 3 tema + mobile bila relevan.
- [ ] Bahasa Indonesia penuh, tanpa em dash; kontrak MDX tidak dilanggar.
