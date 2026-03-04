import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import ProductTabs from '../components/ProductTabs';
import RelatedProducts from '../components/RelatedProducts';
import { ChevronRight } from 'lucide-react';
import { getProductById, getProducts } from '../api/products';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top when navigating to a new product
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data.product);

        // Fetch other products for the related section
        const allProductsData = await getProducts();
        const filtered = allProductsData.products
          .filter(p => p._id !== id)
          .slice(0, 4);
        setRelatedProducts(filtered);

        setLoading(false);
      } catch (err) {
        setError('Failed to load product');
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-500 text-lg">Loading product...</p>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-red-500 text-lg">{error || 'Product not found'}</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb missing from design, but standard practice */}
      <div className="bg-white py-4 border-b border-gray-100 mb-8">
        <div className="container mx-auto px-6 lg:px-10 max-w-[1600px] flex items-center gap-2 text-[14px] text-gray-500">
          <Link to="/" className="hover:text-[#D23F57] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/products" className="hover:text-[#D23F57] transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="truncate max-w-[200px] sm:max-w-[400px]">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-10 max-w-[1600px] flex flex-col gap-16">
        <div className="bg-[#fafafa] p-8 rounded-lg">
          <ProductInfo product={product} />
        </div>
        <div>
          <ProductTabs product={product} />
          {relatedProducts.length > 0 && (
            <RelatedProducts products={relatedProducts} />
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
