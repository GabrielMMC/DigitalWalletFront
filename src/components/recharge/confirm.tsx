import React from 'react'
import Input from '../input'
import useRecharge from '@/hooks/useRecharge'
import Spinner from '../spinner'
import { Card } from '@/domain/Card'
import { useContext } from '@/context/user-context'
import Select from '../select'
import { inputMoneyMask } from '@/utils/masks'
import Button from '../button'

const installments = ['1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x', '11x', '12x']

const ConfirmForm = ({ card, handlePrevius }: { card: Card, handlePrevius: () => void }) => {
  const { setBalance } = useContext()
  const { form, errors, handleChange, handleBlur, loadingSave, handleRecharge } = useRecharge({
    amount: 0,
    installments: 1
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const newBalance = await handleRecharge(e, card.id)
    if (newBalance) {
      setBalance({ amount: newBalance, isWithdrawal: true })
    }
  }

  return (
    <form className="grid grid-cols-6" onSubmit={handleSubmit}>
      <div className="mt-5 col-span-6 sm:col-span-3 sm:me-2">
        <Input
          label="Valor de Recarga"
          name="amount"
          value={inputMoneyMask(form.amount)}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.amount} />
      </div>

      <div className="mt-5 col-span-6 sm:col-span-3 sm:ms-2">
        <Select
          label="Parcelas"
          name="installments"
          value={form.installments}
          onChange={handleChange}
          error={errors?.installments}>
          {installments.map(item => (
            <option key={item}>{item}</option>
          ))}
        </Select>
      </div>

      <div className="col-span-6 flex justify-between mt-5">
        <Button onClick={handlePrevius}>Anterior</Button>
        <Button type="submit" disabled={loadingSave}>{loadingSave ? <Spinner /> : 'Finalizar'}</Button>
      </div>
    </form>
  )
}

export default ConfirmForm