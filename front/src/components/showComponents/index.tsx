'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

const ShowComponent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div>
      {pathname.includes('dashBoard-Admin') ||
      pathname.includes('login') ||
      pathname.includes('register') ||
      pathname.includes('loadingsession') ||
      pathname.includes('formpage') ? null : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default ShowComponent;
