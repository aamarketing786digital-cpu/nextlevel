import { getProductBySlug, getProductsByCategory, getProducts } from "@/lib/sanity";
import { notFound } from "next/navigation";

/**
 * Product Detail Page with Related Products Fallback
 * 
 * Features:
 * - Primary fetch from same category
 * - Automatic fallback to other categories if insufficient results
 * - Optimized slug-based filtering
 */
export default async function ProductPage({ params }: { params: { category: string; slug: string } }) {
  const { category, slug } = params;

  // 1. Fetch main product data
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // 2. Fetch related products (same category)
  const categoryProducts = await getProductsByCategory(category);
  let relatedProducts = categoryProducts
    .filter((p: any) => p.slug !== slug)
    .slice(0, 3);

  // 3. FALLBACK LOGIC: If less than 3, fetch from other categories
  if (relatedProducts.length < 3) {
    const allProducts = await getProducts();
    const otherProducts = allProducts
      .filter((p: any) => p.slug !== slug && p.category?.slug !== category)
      .slice(0, 3 - relatedProducts.length);
    
    relatedProducts = [...relatedProducts, ...otherProducts];
  }

  return (
    <div>
      {/* Product content */}
      <h1>{product.name}</h1>
      
      {/* Related Products Section */}
      <section>
        <h2>Related Products</h2>
        <div className="grid grid-cols-3 gap-4">
          {relatedProducts.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return <div className="border p-4">{product.name}</div>;
}
