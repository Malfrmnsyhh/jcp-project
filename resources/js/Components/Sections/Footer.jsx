import React from 'react';
import ApplicationLogo from '../UI/ApplicationLogo';
import { FaMapMarkerAlt, FaMailBulk, FaPhoneAlt } from 'react-icons/fa';
import { FaHome, } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer id="kontak" className="relative z-10 border-t border-primary-800 bg-primary-900 text-primary-100 py-12">
            <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className='h-10 w-10' />
                        <span className="text-lg font-bold text-white font-header">JCP Profile</span>
                    </div>
                    <p className="text-xs text-primary-100 leading-relaxed max-w-xs">
                        Jombang Creative Project (JCP) menyediakan jasa laser cutting presisi & profesional untuk kebutuhan media akrilik, kayu, MDF, trophy, neon box, dan dekorasi kustom Anda.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-header">Tautan Cepat</h4>
                    <ul className="flex flex-col gap-2 text-xs text-primary-100 text-start">
                        <li><a href="/#hero" className="hover:text-white transition-colors">Beranda</a></li>
                        <li><a href="/#materials" className="hover:text-white transition-colors">Bahan</a></li>
                        <li><a href="/#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
                        <li><a href="/#order" className="hover:text-white transition-colors">Order</a></li>
                        <li><a href="/#about" className="hover:text-white transition-colors">Tentang</a></li>
                        <li><a href="/#faq" className="hover:text-white transition-colors">FAQ</a></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-3 text-xs text-primary-100">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-header">Hubungi Kami</h4>
                    <p className='flex items-start gap-4'>
                        <FaMapMarkerAlt className='w-8 h-8' />
                        Dsn Menganto RT 07 Rw 02 nomor 54, Menganto, Kec. Mojowarno, Kabupaten Jombang, Jawa Timur 61475</p>
                    <p className='flex items-start gap-4'>
                        <FaMailBulk className='w-4 h-4' /> info@jombangcreativeproject.com
                    </p>
                    <p className="flex items-center gap-4">
                        <FaPhoneAlt className="w-4 h-4" />
                        +62 812-3456-7890
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider font-header">Lokasi Kami</h4>
                    <div className="w-full h-48 rounded-lg overflow-hidden shadow-sm border border-primary-800">
                        <iframe
                            src="https://maps.google.com/maps?q=JCP+Jombang+Creative+Project&t=&z=18&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="JCP Jombang Creative Project"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-primary-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-100 cursor-default">
                <p>© 2026 JCP. All rights reserved.</p>
                <div className="flex gap-4 cursor-default">
                    <a className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                    <a className="hover:text-white transition-colors">Kebijakan Privasi</a>
                </div>
            </div>
        </footer>
    );
}
