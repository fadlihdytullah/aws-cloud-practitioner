import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Koleksi "modules": tiap file .mdx di src/content/modules = satu modul belajar.
// Schema HANYA memvalidasi frontmatter (metadata), bukan isi body —
// jadi menambah jenis komponen baru di body tidak akan pernah merusak modul lama.
const modules = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/modules' }),
  schema: z.object({
    title: z.string(), // judul tab/<title>
    badge: z.string(), // teks logo-badge di topbar (mis. "EC2")
    topTitle: z.string(), // judul utama topbar
    topSub: z.string(), // subjudul topbar
    summary: z.string(), // ringkasan singkat untuk halaman indeks
    order: z.number().default(99), // urutan tampil di indeks
    target: z.string().optional(), // mis. "CLF-C02 → SAA-C03"
    readingTime: z.string().optional(), // mis. "~75 menit baca"
    // Daftar isi sidebar. Tambah/kurang section = ubah array ini saja.
    toc: z.array(
      z.object({
        num: z.string(),
        id: z.string(),
        title: z.string(),
      })
    ),
    summaryHref: z.string().default('#summary'),
    footerTitle: z.string(),
    footerSub: z.string(),
  }),
});

export const collections = { modules };
