/**
 * Shared Sanity Types Template
 * 
 * Centralize your Sanity interfaces to ensure type safety 
 * across Server and Client components.
 */

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  category?: Category;
  description?: any; // Portable Text or string
  specifications?: Array<{
    _key: string;
    label: string;
    value: string;
  }>;
  pricing?: {
    price: number;
    compareAtPrice?: number;
    currency: string;
  };
  mainImage?: any;
  images?: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface SiteSettings {
  name: string;
  logo?: any;
  contact?: {
    email: string;
    phone: string;
    whatsapp?: string;
    address: string;
  };
  socialLinks?: Record<string, string>;
}
