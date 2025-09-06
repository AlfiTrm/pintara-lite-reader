# Pintara Lite Reader (PWA)

Projek ini adalah submission untuk Tes Kompetensi Web Developer Internship di PT Inspirasi Mandiri Nusantara. Proyek ini adalah versi 'Lite' dari aplikasi Pintara Flipbook Reader, dibangun sebagai Progressive Web App (PWA) dengan fokus pada fungsi offline.

---

### **Arsitektur Cache, Pengujian, dan Keterbatasan**

Berikut adalah penjelasan yang menjawab poin-poin dari tugas.

#### **Arsitektur Cache**

Website atau kita sebut saja aplikasi pada projek ini menggunakan arsitektur cache hybrid yang diimplementasikan melalui Service Worker manual untuk pengalaman offlinenya. Saat pertama kali di-install, aplikasi langsung menyimpan "kerangka" utamanya termasuk kode JavaScript, CSS, halaman penting, dan data **books.json** ke dalam *pre-cache* atau spesifiknya *pre-cache app shell*. *Pre-cache* ini membuat aplikasi bisa selalu siap (gak nge-blank) dan menampilkan konten halaman utama meski tanpa internet(bisa menampilkan fallback dan halaman yang sudah ter-simpan di cache). Kemudian, saat Anda menggunakan aplikasi, gambar-gambar halaman buku yang Anda buka akan disimpan secara **runtime** ke dalam *cache* atau kita sebut saja *Cache-First*, dimana ketika kita berada dimode *offline*, maka saat berpindah halaman, *service worker* akan mencari cache terlebih dahulu alih-alih aplikasi load untuk render halaman yang dicari. Strategi ini dipilih agar halaman yang sudah dibaca bisa dimuat secara instan dari cache saat ada *request* untuk akses kembali(baik online untuk mempercepat load maupun offline).

#### **Cara Uji Offline**

1.  **Install Aplikasi:** Buka link di Chrome (Android) dan pilih **"Install App"** atau **"Tambahkan ke layar utama"**.
2.  **Akses:** Buka aplikasi dari ikon di layar utama saat **online**. Kunjungi halaman utama, lalu masuk dan baca beberapa halaman dari salah satu buku.
3.  **Mulai Offline:** Aktifkan **Mode Pesawat** pada perangkat.
4.  **Tes Fungsi:**

   * Halaman *offline*: Jika sudah membuka home, memilih buku, dan 2/4 dari halaman buku, navigasi kembali ke halaman 1, 2, dan home. Halaman itu akan tetap tampil.
   * Fallback : Navigasi ke halaman yang belum pernah di akses (misal:halaman 3), maka akan muncul pesan fallback.
   * Buka Ulang: Pada mode **Pesawat**, tutup aplikasi dan bersihkan dari daftar aplikasi pada HP. Kemudian buka kembali aplikasi, maka akan tetap bisa membuka halaman yang sudah dimuat di cache. Hal ini membuktikan bahwa *pre-cache app shell* bekerja.
        
#### **Keterbatasan & Ide Perbaikan**

* **Keterbatasan:** Karena data dari file `books.json` dimasukkan ke dalam *pre-cache*, daftar buku tidak akan diperbarui secara otomatis jika ada perubahan di sisi server hingga versi Service Worker yang baru diaktifkan.
* **Ide Perbaikan:** Mengimplementasikan fitur `prefetch` halaman buku berikutnya, sehingga pengalaman membalik halaman bisa lebih cepat.

---
Dibuat oleh **Muhammad Alfi Tsani Ramadhan**
