import Image from 'next/image'
import React from 'react'

type Brand = {
  brand: 'amex' | 'aura' | 'diners' | 'discover' | 'elo' | 'hipercard' | 'jcb_15' | 'jcb_16' | 'mastercard' | 'nocard' | 'visa'
}

const Brands = ({ brand }: { brand: Brand }) => {

  return (
    <Image
      src={`/assets/brands/${brand}.png`}
      alt="Brand"
      width={70}
      height={50}
      sizes="100vw"
      priority
    />
  )
}

export default Brands