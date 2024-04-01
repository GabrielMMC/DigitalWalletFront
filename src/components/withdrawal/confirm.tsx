import React from 'react'
import Input from '../input'
import Spinner from '../spinner'
import { useContext } from '@/context/user-context'

import { BankAccount } from '@/domain/BankAccount'
import { inputMoneyMask, moneyMaskBRL } from '@/utils/masks'
import useWithdrawal from '@/hooks/useWithdrawal'
import Button from '../button'

const ConfirmForm = ({ account, handlePrevius }: { account: BankAccount, handlePrevius: () => void }) => {
  const { setBalance } = useContext()
  const { form, errors, handleChange, handleBlur, loadingSave, handleWithdrawal } = useWithdrawal({
    amount: 0
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const newBalance = await handleWithdrawal(e, account.id)
    if (newBalance) {
      setBalance({ amount: newBalance, isWithdrawal: true })
    }
  }

  return (
    <form className="grid grid-cols-6" onSubmit={handleSubmit}>
      <div className="mt-5 col-span-6">
        <Input
          label="Valor de Saque"
          name="amount"
          value={inputMoneyMask(form.amount)}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.amount} />
      </div>
      <div className="col-span-6 flex justify-between mt-5">
        <Button onClick={handlePrevius}>Anterior</Button>
        <Button type="submit" disabled={loadingSave}>{loadingSave ? <Spinner /> : 'Finalizar'}</Button>
      </div>
    </form>
  )
}

export default ConfirmForm