'use client'

import React from 'react'
import AddressesForm from './addresses'
import CardsForm from './cards'
import { Card } from '@/domain/Card'
import ConfirmForm from './confirm'

const RechargeStepper = () => {
  const [addressId, setAddressId] = React.useState('')
  const [card, setCard] = React.useState<Card | null>(null)
  const [step, setStep] = React.useState(0)

  return (
    <>
      {step === 0 &&
        <AddressesForm
          addressId={addressId}
          setAddressId={setAddressId}
          handleNext={() => { if (addressId) setStep(1) }} />}
      {step === 1 &&
        <CardsForm
          card={card}
          setCard={setCard}
          addressId={addressId}
          handlePrevius={() => setStep(0)}
          handleNext={() => { if (card) setStep(2) }} />}
      {step === 2 && card &&
        <ConfirmForm
          card={card}
          handlePrevius={() => setStep(1)} />}
    </>
  )
}

export default RechargeStepper