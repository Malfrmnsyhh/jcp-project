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
        thickness_options: ["1mm", "2mm", "3mm", "5mm", "10mm"],
        finishes: [
            { name: "Bening", swatch: "#eef6f8" },
            { name: "Susu", swatch: "#f5f5f0" },
            { name: "Hitam Solid", swatch: "#1a1a1a" },
            { name: "Putih Solid", swatch: "#ffffff" },
            { name: "Gold Mirror", swatch: "#d4af37" },
            { name: "Merah-032", swatch: "#e50811" },
        ]
    },
    {
        id: 2,
        category: "Kayu",
        name: "Serat Kayu / MDF",
        icon: <FiLayers />,
        short_description: "Natural, hangat, dan mudah dibentuk",
        description: "Material kayu memberikan kesan natural dan estetik. MDF sangat halus permukaannya, cocok untuk huruf timbul atau dekorasi dinding yang akan dicat duco.",
        thickness_options: ["2mm", "3mm", "5cm"],
        finishes: [
            { name: "Jati Belanda", swatch: "#d4b886" },
            { name: "MDF Mentah", swatch: "#c2a370" },
            { name: "Plywood", swatch: "#e8cfa6" }
        ]
    },
];
