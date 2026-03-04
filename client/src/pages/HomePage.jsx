import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import FlashDeals from '../components/FlashDeals';
import Banners from '../components/Banners';
import NewArrivals from '../components/NewArrivals';
import CustomSolutions from '../components/CustomSolutions';
import JustForYou from '../components/JustForYou';
import ShopsAndProducts from '../components/ShopsAndProducts';
import { getProducts } from '../api/products';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to load products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;

  return (
    <>
      <Hero />
      <FlashDeals products={products.slice(0, 6)} />
      <Banners />
      <NewArrivals products={products.slice(4, 10)} />
      <CustomSolutions />
      <JustForYou products={products.slice(0, 8)} />
      <ShopsAndProducts products={products.slice(0, 6)} />
    </>
  );
}

export default HomePage;