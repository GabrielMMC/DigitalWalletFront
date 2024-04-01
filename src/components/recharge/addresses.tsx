import { Address } from '@/domain/Address'
import useAddress from '@/hooks/useAddress'
import React from 'react'
import Input from '../input'
import Button from '../button'
import Spinner from '../spinner'
import Radio from '../radio'

const AddressesForm = ({ addressId, setAddressId, handleNext }:
  { addressId: string, setAddressId: React.Dispatch<React.SetStateAction<string>>, handleNext: () => void }
) => {
  const [data, setData] = React.useState<Address[]>([])
  const [showForm, setShowForm] = React.useState(false)
  const { form, errors, handleChange, handlePostalCode, handleBlur, handleCreateAddress, getAddressesList, loading, loadingSave } = useAddress({
    nbhd: '',
    city: '',
    state: '',
    street: '',
    number: '',
    zip_code: '',
    complement: ''
  })

  React.useEffect(() => { getData() }, [])
  const getData = async () => setData(await getAddressesList())
  const toggleShowForm = () => setShowForm(!showForm)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const status = await handleCreateAddress(e);

    if (!status) return

    setShowForm(false)
    getData()
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
            <p className='text-sm my-5'>Selecione um endereço ou
              <span className='font-bold text-sky-500 cursor-pointer' onClick={toggleShowForm}> crie um novo</span>
            </p>
            {data.map((item) => (
              <div key={item.id} className='bg-sky-100 rounded py-3 flex justify-between cursor-pointer mb-3' onClick={() => setAddressId(item.id)} >
                <span className='font-bold text-sm ms-3'>{item.city} - {item.state} - {item.nbhd} - {item.street} - {item.number}</span>
                <div className="me-2">
                  <Radio
                    label=''
                    id={item.id}
                    checked={item.id === addressId}
                    onChange={() => setAddressId(item.id)} />
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-5">
              <Button onClick={handleNext}>Próximo</Button>
            </div>
          </>
          :
          <form onSubmit={handleSubmit}>
            <p className='text-sm my-5'>Crie um endereço ou
              <span className='font-bold text-sky-500 cursor-pointer' onClick={toggleShowForm}> selecione um existente</span>
            </p>
            <div className="grid grid-cols-6">
              <div className="mt-5 col-span-6 sm:col-span-2 sm:me-2">
                <Input
                  label="CEP"
                  name="zip_code"
                  value={form.zip_code}
                  onBlur={handleBlur}
                  onChange={handlePostalCode}
                  error={errors?.zip_code} />
              </div>
              <div className="mt-5 col-span-6 sm:col-span-2 sm:mx-2">
                <Input
                  label="Cidade"
                  name="city"
                  value={form.city}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors?.city} />
              </div>
              <div className="mt-5 col-span-6 sm:col-span-2 sm:ms-2">
                <Input
                  label="Estado"
                  name="state"
                  value={form.state}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors?.state} />
              </div>
            </div>

            <div className="grid grid-cols-6">
              <div className="mt-5 col-span-6 sm:col-span-3 sm:me-2">
                <Input
                  label="Bairro"
                  name="nbhd"
                  value={form.nbhd}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors?.nbhd} />
              </div>
              <div className="mt-5 col-span-6 sm:col-span-3 sm:ms-2">
                <Input
                  label="Rua"
                  name="street"
                  value={form.street}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors?.street} />
              </div>
            </div>

            <div className="grid grid-cols-6">
              <div className="mt-5 col-span-6 sm:col-span-4 sm:me-2">
                <Input
                  label="Complemento"
                  name="complement"
                  value={form.complement}
                  onChange={handleChange}
                  error={errors?.complement} />
              </div>
              <div className="mt-5 col-span-6 sm:col-span-2 sm:ms-2">
                <Input
                  label="Número"
                  name="number"
                  value={form.number}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors?.number} />
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

export default AddressesForm