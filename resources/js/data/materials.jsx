import React from 'react';
import { FiLayers, FiBox, FiGrid, FiTablet, FiHardDrive, FiShield } from 'react-icons/fi';

export const materialsData = [
    {
        id: 1,
        category: "Akrilik",
        name: "Akrilik",
        icon: <FiBox />,
        short_description: "Bening, susu, solid, mirror",
        description: "Bahan transparan atau berwarna dengan hasil akhir elegan. Sangat cocok untuk pembuatan plakat, signage, neon box, dan display produk eksklusif.",
        thickness_options: ["2mm", "3mm", "5mm", "8mm", "10mm", "15mm", "20mm"],
        finishes: [
            { name: "Bening", swatch: "#eef6f8" },
            { name: "Susu", swatch: "#f5f5f0" },
            { name: "Hitam Solid", swatch: "#1a1a1a" },
            { name: "Putih Solid", swatch: "#ffffff" },
            { name: "Gold Mirror", swatch: "#d4af37" },
            { name: "Silver Mirror", swatch: "#c0c0c0" }
        ]
    },
    {
        id: 2,
        category: "Kayu",
        name: "Kayu Solid & MDF",
        icon: <FiLayers />,
        short_description: "Natural, hangat, dan mudah dibentuk",
        description: "Material kayu memberikan kesan natural dan estetik. MDF sangat halus permukaannya, cocok untuk huruf timbul atau dekorasi dinding yang akan dicat duco.",
        thickness_options: ["3mm", "5mm", "9mm", "12mm", "15mm", "18mm"],
        finishes: [
            { name: "Jati Belanda", swatch: "#d4b886" },
            { name: "MDF Mentah", swatch: "#c2a370" },
            { name: "Plywood", swatch: "#e8cfa6" }
        ]
    },
    {
        id: 3,
        category: "PVC",
        name: "PVC Board",
        icon: <FiTablet />,
        short_description: "Ringan, tahan air & cuaca",
        description: "PVC Board adalah pengganti kayu yang sangat ringan, anti rayap, dan tahan air. Sangat ideal untuk huruf timbul outdoor maupun indoor.",
        thickness_options: ["3mm", "5mm", "9mm", "12mm", "15mm", "18mm"],
        finishes: [
            { name: "Putih Matte", swatch: "#f8f9fa" }
        ]
    },
    {
        id: 4,
        category: "ACP",
        name: "Aluminium Composite Panel",
        icon: <FiGrid />,
        short_description: "Kaku, ringan, tahan karat",
        description: "Material perpaduan aluminium dan komposit yang sangat awet untuk pemakaian outdoor. Sering digunakan untuk fasad bangunan atau background papan nama.",
        thickness_options: ["3mm", "4mm"],
        finishes: [
            { name: "Putih Glossy", swatch: "#ffffff" },
            { name: "Hitam Glossy", swatch: "#000000" },
            { name: "Silver Metallic", swatch: "#a8a9ad" },
            { name: "Kuning", swatch: "#facc15" },
            { name: "Merah", swatch: "#ef4444" }
        ]
    },
    {
        id: 5,
        category: "Besi",
        name: "Besi Plat",
        icon: <FiHardDrive />,
        short_description: "Kuat, kaku, dan industrial",
        description: "Plat besi yang dipotong dengan laser fiber menghasilkan presisi tinggi. Sering digunakan untuk pagar custom, sekat ruangan (partisi), dan signage industrial.",
        thickness_options: ["1mm", "1.2mm", "1.5mm", "2mm", "3mm"],
        finishes: [
            { name: "Mentah", swatch: "#5a5a5a" },
            { name: "Karat (Rustic)", swatch: "#8b4513" }
        ]
    },
    {
        id: 6,
        category: "Stainless",
        name: "Stainless Steel",
        icon: <FiShield />,
        short_description: "Anti karat, premium, elegan",
        description: "Material logam paling premium yang tidak akan berkarat. Sangat cocok untuk huruf timbul perusahaan, name tag kantor eksklusif, dan nomor rumah mewah.",
        thickness_options: ["0.8mm", "1mm", "1.2mm", "1.5mm"],
        finishes: [
            { name: "Mirror (Kaca)", swatch: "#e3e4e5" },
            { name: "Hairline (Garis)", swatch: "#a9a9a9" },
            { name: "Gold Mirror", swatch: "#d4af37" },
            { name: "Rose Gold", swatch: "#b76e79" }
        ]
    }
];
