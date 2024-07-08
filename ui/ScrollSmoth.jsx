import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FilterContext from '../Context/FilterContext';

const ScrollToTop = () => {
  const { filterCatagorys } = useContext(FilterContext); // Corrected spelling
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [filterCatagorys]);

  return null;
};

export default ScrollToTop;
