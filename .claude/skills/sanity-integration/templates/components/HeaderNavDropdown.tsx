"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Category } from "../lib/sanity-types";

/**
 * Premium Header Navigation with Dropdown
 * 
 * Features:
 * - Animated dropdown using Framer Motion
 * - Server-side category data injection
 * - Accessible hover states
 */
export default function HeaderNavDropdown({ categories }: { categories: Category[] }) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const navItems = [
    { label: 'Products', href: '/products', hasDropdown: true },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="flex items-center space-x-4">
      {navItems.map((item) => (
        <div
          key={item.label}
          onMouseEnter={() => setActiveItem(item.label)}
          onMouseLeave={() => setActiveItem(null)}
          className="relative px-4 py-2"
        >
          <Link href={item.href} className="flex items-center gap-1 font-medium">
            {item.label}
            {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
          </Link>

          {item.hasDropdown && (
            <AnimatePresence>
              {activeItem === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-xl shadow-xl p-2 z-50"
                >
                  <Link href="/products" className="block px-4 py-2 hover:bg-gray-50 rounded-lg text-sm font-bold">
                    All Products
                  </Link>
                  <hr className="my-1 border-gray-100" />
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/products/${cat.slug}`}
                      className="block px-4 py-2 hover:bg-gray-50 rounded-lg text-sm"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ))}
    </nav>
  );
}
