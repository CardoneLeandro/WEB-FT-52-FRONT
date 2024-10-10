'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
const redirect = useRouter()
    useEffect(() => {
      redirect.push('/')
    }, [])

  return (
    <div>
      
    </div>
  )
}
