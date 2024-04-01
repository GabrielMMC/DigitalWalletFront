import React from 'react'
import Input from '../input'
import Button from '../button'
import Spinner from '../spinner'
import Radio from '../radio'
import useBankAccount from '@/hooks/useBankAccount'
import { BankAccount } from '@/domain/BankAccount'
import { numberMask } from '@/utils/masks'

const BankAccountForm = ({ account, setAccount, handleNext }:
  { account: BankAccount | null, setAccount: React.Dispatch<React.SetStateAction<BankAccount | null>>, handleNext: () => void }
) => {
  const [data, setData] = React.useState<BankAccount[]>([])
  const [showForm, setShowForm] = React.useState(false)
  const { form, errors, handleChange, handleBlur, handleCreateAccount, getAccountList, loading, loadingSave } = useBankAccount({
    bank: null,
    account_number: null,
    account_digit: null,
    branch_number: null,
    branch_digit: null,
  })

  React.useEffect(() => { getData() }, [])
  const getData = async () => setData(await getAccountList())
  const toggleShowForm = () => setShowForm(!showForm)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const status = await handleCreateAccount(e);

    if (!status) {
      return
    }

    getData()
    setShowForm(false)
  }

  if (loading) {
    return (
      <div className='flex w-full justify-center'>
        <Spinner />
      </div>
    )
  } else {
    return (
      <div className=''>
        {data.length > 0 && !showForm ?
          <>
            <p className='text-sm my-5'>Selecione uma conta ou
              <span className='font-bold text-sky-500 cursor-pointer' onClick={toggleShowForm}> adicione uma nova</span>
            </p>
            {data.map((item) => (
              <div key={item.id} className='bg-sky-100 rounded py-3 flex justify-between cursor-pointer mb-3' onClick={() => setAccount(item)} >
                <span className='font-bold text-sm ms-3'>{item.bank} - {item.account_number} - {item.account_digit} - {item.branch_number} - {item.branch_digit}</span>
                <div className="me-2">
                  <Radio
                    label=''
                    id={item.id}
                    checked={item.id === account?.id}
                    onChange={() => setAccount(item)} />
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-5">
              <Button onClick={handleNext}>Próximo</Button>
            </div>
          </>
          :
          <form onSubmit={handleSubmit}>
            <p className='text-sm my-5'>Adicione uma conta ou
              <span className='font-bold text-sky-500 cursor-pointer' onClick={toggleShowForm}> selecione uma existente</span>
            </p>
            <div className="grid grid-cols-8">
              <div className="mt-5 col-span-8 sm:col-span-2 sm:me-2">
                <Input
                  label="Banco"
                  name="bank"
                  value={numberMask(form.bank)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  maxLength={3}
                  error={errors?.bank} />
              </div>
              <div className="mt-5 col-span-6 sm:col-span-4 sm:mx-2">
                <Input
                  label="Agência"
                  name="branch_number"
                  value={numberMask(form.branch_number)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  maxLength={4}
                  error={errors?.branch_number} />
              </div>
              <div className="mt-5 col-span-6 sm:col-span-2 sm:ms-2">
                <Input
                  label="Dígito da Agência"
                  name="branch_digit"
                  value={numberMask(form.branch_digit)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  maxLength={2}
                  error={errors?.branch_digit} />
              </div>
            </div>

            <div className="grid grid-cols-6">
              <div className="mt-5 col-span-8 sm:col-span-4 sm:me-2">
                <Input
                  label="Conta"
                  name="account_number"
                  value={numberMask(form.account_number)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  maxLength={9}
                  error={errors?.account_number} />
              </div>
              <div className="mt-5 col-span-6 sm:col-span-2 sm:ms-2">
                <Input
                  label="Dígito da Conta"
                  name="account_digit"
                  value={numberMask(form.account_digit)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  maxLength={1}
                  error={errors?.account_digit} />
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <Button type="submit" disabled={loadingSave}>{loadingSave ? <Spinner /> : 'Salvar'}</Button>
            </div>
          </form>}
      </div>
    )
  }
}

export default BankAccountForm