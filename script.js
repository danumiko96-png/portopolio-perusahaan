/* =====================================================
   script.js – interaksi website
   ===================================================== */

/* 1. Menu di HP: buka/tutup, dan menutup otomatis setelah link diklik */
const header = document.querySelector("header");
const tombolMenu = document.querySelector(".menu-btn");
function aturMenu(buka) {
  header.classList.toggle("buka", buka);
  tombolMenu.setAttribute("aria-expanded", buka);
  tombolMenu.innerHTML = buka ? "&times;" : "&#9776;";
}
tombolMenu.addEventListener("click", () => aturMenu(!header.classList.contains("buka")));
document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => aturMenu(false)));

/* 2. Angka statistik bergerak naik saat terlihat di layar (satu kali) */
const angka = document.querySelectorAll(".angka b[data-target]");
const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function tampil(el, nilai) {
  el.textContent = nilai.toLocaleString("id-ID") + el.dataset.akhiran;
}
if ("IntersectionObserver" in window && !kurangiGerak) {
  const pengamat = new IntersectionObserver((daftar) => {
    daftar.forEach(item => {
      if (!item.isIntersecting) return;
      const el = item.target, target = +el.dataset.target, mulai = performance.now(), durasi = 1200;
      (function langkah(t) {
        const p = Math.min((t - mulai) / durasi, 1);
        tampil(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(langkah);
      })(mulai);
      pengamat.unobserve(el);
    });
  }, { threshold: 0.6 });
  angka.forEach(el => { tampil(el, 0); pengamat.observe(el); });
}

/* 3. Formulir kontak: kirim ke WhatsApp */
/* Ganti dengan nomor WhatsApp Anda, tanpa tanda + atau spasi */
const NOMOR_WA = "6281234567890";

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const teks = "Halo, saya " + document.getElementById("nama").value +
    ". Saya membutuhkan: " + document.getElementById("jenis").value +
    ". " + document.getElementById("pesan").value;
  window.open("https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(teks), "_blank");
});
