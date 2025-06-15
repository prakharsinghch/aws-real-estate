"use client";

import { Navbar } from '@/components/Navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const Layout = ( {children} : {children : React.ReactNode}) => {

    const {data : authUser, isLoading : authLoading} = useGetAuthUserQuery();
  const router = useRouter();
      const pathName = usePathname();
      const [isLoading, setIsLoading] = React.useState(true);
  
      useEffect(() =>{
          if(authUser) {
              const userRole = authUser.userRole?.toLowerCase();
              if ( (userRole === 'manager' && pathName.startsWith("/search")) || (userRole === 'manager' && pathName.startsWith("/")) ) {
                  router.push(
                     "/managers/properties",
                      {scroll: false}
                  );
          } else {
              setIsLoading(false);
          }
      }
      } , [authUser, router, pathName]);
  
  
      if(authLoading || isLoading) return <>Loading...</>

  return (
    <div className='h-full w-full'>
       <Navbar />
      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout