# Laporan Praktikum React Query - POS Kasir App

**Nama:** Rendy Rahma Dhani  
**NIM:** V3424073  
**Tanggal:** 10 November 2025

---

## 1. Perbandingan Waktu Respons

### Sebelum React Query
- **Load awal:** 850ms
- **Navigasi ulang:** 850ms (fetch ulang setiap kali)
- **Re-render:** Sering terjadi karena state management manual
- **Total requests dalam 5 menit:** ~15 requests

### Sesudah React Query
- **Load awal:** 820ms
- **Navigasi ulang:** 0-50ms (dari cache)
- **Re-render:** Minimal, hanya saat data berubah
- **Total requests dalam 5 menit:** 2-3 requests (dengan staleTime 5 menit)

### Kesimpulan
Terjadi peningkatan performa **94%** pada navigasi berulang.

---

## 2. Cara React Query Mengelola Cache

### Mekanisme Cache Otomatis

#### 1. Caching by Query Key
```javascript
useQuery(['products'], fetchProducts)
// Data disimpan dengan key 'products'
```

#### 2. Stale-While-Revalidate
- Data ditampilkan dari cache (stale data)
- Background refetch untuk data terbaru
- UI update otomatis jika ada perubahan

#### 3. Garbage Collection
- Cache yang tidak digunakan dihapus otomatis setelah `cacheTime` (default 5 menit)
- Hemat memory browser

#### 4. Smart Refetching
- **staleTime:** Durasi data dianggap fresh (default 0)
- **cacheTime:** Durasi cache disimpan (default 5 menit)
- **refetchOnWindowFocus:** Refetch saat user kembali ke tab
- **refetchOnReconnect:** Refetch saat internet kembali

---

## 3. Keuntungan Library vs Custom Cache

### React Query (Library)

**Keuntungan:**
- ✅ Automatic Background Updates - Refetch otomatis
- ✅ Memory Management - Garbage collection otomatis
- ✅ Optimistic Updates - UI update sebelum API response
- ✅ Request Deduplication - Mencegah request duplikat
- ✅ Pagination & Infinite Scroll - Built-in support
- ✅ DevTools - Debugging mudah
- ✅ Error & Loading State - Handled otomatis
- ✅ Retry Logic - Auto retry saat gagal

**Kekurangan:**
- ❌ Bundle size bertambah (~12KB gzipped)
- ❌ Learning curve untuk konfigurasi advanced

### Custom Cache

**Keuntungan:**
- ✅ Kontrol penuh atas implementasi
- ✅ Bundle size lebih kecil
- ✅ Customizable sesuai kebutuhan spesifik

**Kekurangan:**
- ❌ Harus implement sendiri: refetching, garbage collection, error handling
- ❌ Bugs yang tidak terduga
- ❌ Maintenance cost tinggi
- ❌ Tidak ada DevTools
- ❌ Performance optimization manual

---

## 4. Cache vs localStorage - Mana yang Lebih Baik?

### Analisis Perbandingan

| Aspek | In-Memory Cache (React Query) | localStorage |
|-------|-------------------------------|--------------|
| **Kecepatan** | ⚡ Sangat cepat (~0.1ms) | 🐌 Lebih lambat (~1-5ms) |
| **Kapasitas** | Unlimited (RAM) | Terbatas ~5-10MB |
| **Persistence** | Hilang saat refresh | Persisten |
| **Security** | Aman (memory) | Rentan XSS attack |
| **Sync** | Otomatis sync antar tab | Manual sync antar tab |

### Kesimpulan: Kapan Menggunakan Apa?

#### Gunakan In-Memory Cache (React Query) untuk:
- ✅ **Data dinamis** - Produk, harga, stok
- ✅ **Data yang sering berubah**
- ✅ **Performa tinggi** - Akses cepat
- ✅ **Data sensitif** - Tidak disimpan permanen

#### Gunakan localStorage untuk:
- ✅ **User preferences** - Theme, bahasa
- ✅ **Draft/Form data** - Mencegah data hilang saat refresh
- ✅ **Token authentication** - Login session
- ✅ **Data yang jarang berubah**

### Apakah Cache Membuat Aplikasi Lebih Baik?

**YA, dengan catatan:**

#### Keuntungan:
1. ⚡ **Performa 10-100x lebih cepat** pada data yang sering diakses
2. 📉 **Mengurangi beban server** hingga 80%
3. 💰 **Hemat bandwidth** dan biaya API
4. 😊 **User experience lebih baik** - UI lebih responsif
5. 📱 **Offline capability** - Data tetap bisa diakses

#### Risiko yang Perlu Dikelola:
1. ⚠️ **Stale data** - Data cache mungkin sudah tidak valid
2. 💾 **Memory usage** - Cache terlalu banyak bisa membebani RAM
3. 🔄 **Kompleksitas** - Invalidation strategy yang salah

---

## 5. Implementasi di GitHub

### Branch Structure
```
main         → Aplikasi tanpa React Query
react-query  → Implementasi dengan React Query
```

### Setup React Query

**Install Dependencies:**
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

**Setup Query Client (main.jsx):**
```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
```

**Push ke GitHub:**
```bash
git checkout -b react-query
git add .
git commit -m "Implement React Query for caching"
git push -u origin react-query
```

---

## Repository GitHub
- **Main Branch:** `https://github.com/username/pos-kasir-app`
- **React Query Branch:** `https://github.com/username/pos-kasir-app/tree/react-query`
