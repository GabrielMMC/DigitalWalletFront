'use client'

import React from 'react'
import { BankAccount } from '@/domain/BankAccount'
import BankAccountForm from './bank-accounts'
import ConfirmForm from './confirm'

const WithrawalStepper = () => {
  const [bankAccount, setBankAccount] = React.useState<BankAccount | null>(null)
  const [step, setStep] = React.useState(0)

  return (
    <div>
      {step === 0 &&
        <BankAccountForm
          account={bankAccount}
          setAccount={setBankAccount}
          handleNext={() => { if (bankAccount) setStep(1) }} />
      }
      {step === 1 && bankAccount &&
        <ConfirmForm
          account={bankAccount}
          handlePrevius={() => setStep(0)} />}
    </div>
  )
}

export default WithrawalStepper