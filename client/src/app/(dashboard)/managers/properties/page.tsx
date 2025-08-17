"use client";

import React, { use } from 'react'
import { useGetAuthUserQuery, useGetManagerPropertiesQuery, useGetPropertiesQuery, useGetTenantQuery } from '@/state/api';
import Loading from '@/components/Loading';
import Header from '@/components/Header';
import Card from '@/components/Card';
import { Property } from '@/types/prismaTypes';

const Properties = () => {

  const { data: authUser } = useGetAuthUserQuery();

  const { 
    data : managerProperties,
    isLoading,
    isError
  } = useGetManagerPropertiesQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  )
  ;


  if (isLoading) return <Loading />
  if( isError) return <div>Error loading manager properties</div>

  
  return (
    <div
      className='dashboard-container'
    >
      <Header 
        title='My Properties'
        subtitle='View and manage your properties' 
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'> 
        {managerProperties?.map((property) => (
          <Card
                key={property.id}
                property={property}
                isFavorite={false}     
                onFavoriteToggle={() => {}}
                showFavoriteButton={false}
                propertyLink={`/managers/properties/${property.id}`}
              />
        ))}
      </div>
      {(!managerProperties || managerProperties.length === 0) && (
        <p>You don't manage any properties</p>  
      )}
    </div>
  )
}

export default Properties