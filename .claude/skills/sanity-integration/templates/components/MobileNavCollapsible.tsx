"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Package } from "lucide-react";
import { Category } from "../lib/sanity-types";

/**
 * Mobile Navigation with Collapsible Categories
 * 
 * Features:
 * - Expandable sub-menus for categories
 * - Mobile-optimized touch targets
 * - Smooth height transitions
 */
export default function MobileNavCollapsible({ categories }: { categories: Category[] }) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <nav className="flex flex-col space-y-2 p-4">
      {/* Collapsible Section */}
      <div className="space-y-1">
        <button
          onClick={() => setIsProductsOpen(!isProductsOpen)}
          className="flex items-center justify-between w-full p-4 text-brand-primary font-semibold hover:bg-gray-50 rounded-xl"
        >
          <span className="flex items-center gap-3">
            <Package className="w-5 h-5" />
            Products
          </span>
          <ChevronDown className={`w-5 h-5 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${isProductsOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pl-12 space-y-1 border-l-2 ml-6">
            <Link href="/products" className="block py-2 text-sm font-bold text-brand-primary">
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/products/${cat.slug}`}
                className="block py-2 text-sm text-gray-600 hover:text-brand-primary"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Link href="/about" className="p-4 font-semibold text-brand-primary hover:bg-gray-50 rounded-xl">About</Link>
      <Link href="/contact" className="p-4 font-semibold text-brand-primary hover:bg-gray-50 rounded-xl">Contact</Link>
    </nav>
  );
}
