import React, { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext(null);

export const DeviceProvider = ({ children }) => {
  const [deviceInfo, setDeviceInfo] = useState(() => getSnapshot());
  const [simulatedDevice, setSimulatedDevice] = useState('auto'); // 'auto' | 'phone' | 'tablet' | 'desktop'

  function getSnapshot() {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isPhone: false,
        isTablet: false,
        isDesktop: true,
        isTouch: false,
        os: 'Unknown',
        browser: 'Unknown',
        orientation: 'portrait',
        width: 1200,
        height: 800,
      };
    }

    const ua = navigator.userAgent || navigator.vendor || window.opera || '';
    const isTouch = Boolean(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );

    // OS Detection
    let os = 'Unknown';
    if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
    else if (/Linux/i.test(ua)) os = 'Linux';

    // Browser Detection
    let browser = 'Unknown';
    if (/Chrome|CriOS/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox|FxiOS/i.test(ua)) browser = 'Firefox';
    else if (/Edg/i.test(ua)) browser = 'Edge';

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPhoneUA = /iPhone|Android.*Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    const isTabletUA = /iPad|Android(?!.*Mobile)/i.test(ua);

    const isPhone = width < 640 || (isPhoneUA && width < 768);
    const isTablet = (width >= 640 && width < 1024) || isTabletUA;
    const isDesktop = width >= 1024 && !isPhoneUA && !isTabletUA;
    const isMobile = isPhone || isTablet || isPhoneUA;

    const orientation = width > height ? 'landscape' : 'portrait';

    return {
      isMobile,
      isPhone,
      isTablet,
      isDesktop,
      isTouch,
      os,
      browser,
      orientation,
      width,
      height,
    };
  }

  useEffect(() => {
    const handleResize = () => {
      const snap = getSnapshot();
      setDeviceInfo(snap);

      // Set CSS variables for accurate mobile viewport
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);

      // Set data attributes for global styling
      const activeType = snap.isPhone ? 'phone' : snap.isTablet ? 'tablet' : 'desktop';
      document.documentElement.setAttribute('data-device', activeType);
      document.documentElement.setAttribute('data-os', snap.os.toLowerCase());
      document.documentElement.setAttribute('data-touch', snap.isTouch ? 'true' : 'false');
    };

    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Effective values considering simulation
  const effectiveIsPhone =
    simulatedDevice === 'phone' ? true :
    simulatedDevice === 'desktop' ? false :
    simulatedDevice === 'tablet' ? false :
    deviceInfo.isPhone;

  const effectiveIsTablet =
    simulatedDevice === 'tablet' ? true :
    simulatedDevice === 'desktop' ? false :
    simulatedDevice === 'phone' ? false :
    deviceInfo.isTablet;

  const effectiveIsMobile = effectiveIsPhone || effectiveIsTablet;
  const effectiveIsDesktop = !effectiveIsMobile;

  const value = {
    ...deviceInfo,
    isPhone: effectiveIsPhone,
    isTablet: effectiveIsTablet,
    isMobile: effectiveIsMobile,
    isDesktop: effectiveIsDesktop,
    deviceType: effectiveIsPhone ? 'phone' : effectiveIsTablet ? 'tablet' : 'desktop',
    simulatedDevice,
    setSimulatedDevice,
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
