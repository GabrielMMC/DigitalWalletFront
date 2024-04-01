import React from 'react'
import Input from '../input'
import Button from '../button'
import Spinner from '../spinner'
import Radio from '../radio'
import { Card } from '@/domain/Card'
import useCard from '@/hooks/useCard'
import { cardMask, documentMask, expirationMask, numberMask } from '@/utils/masks'
import InputGroup from '../input-group'
import Brands from '../brands'

const CardsForm = ({ card, addressId, setCard, handleNext, handlePrevius }:
  { card: Card | null, addressId: string, setCard: React.Dispatch<React.SetStateAction<Card | null>>, handleNext: () => void, handlePrevius: () => void }
) => {
  const [data, setData] = React.useState<Card[]>([])
  const [showForm, setShowForm] = React.useState(false)
  const { form, errors, handleChange, handleBlur, loading, loadingSave, handleCreateCard, handleCardChange, getCardsList, cvvLength } = useCard({
    number: '',
    holder_name: '',
    expiration: '',
    brand: 'nocard',
    holder_document: null,
    cvv: null,
  })

  React.useEffect(() => { getData() }, [])
  const getData = async () => setData(await getCardsList())
  const toggleShowForm = () => setShowForm(!showForm)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const status = await handleCreateCard(e, addressId);

    if (!status) return

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
            <p className='text-sm my-5'>Selecione um cartão ou
              <span className='font-bold text-sky-500 cursor-pointer' onClick={toggleShowForm}> crie um novo</span>
            </p>
            <div className="grid grid-cols-6">
              {data.map((item) => (
                <div key={item.id} className='flex flex-col flex-1 card justify-between col-span-3 bg-sky-200 rounded-md mb-3 mx-2 cursor-pointer' onClick={() => setCard(item)}>
                  <div className="mt-3">
                    <div className="flex justify-between ms-3 text-lg">
                      <span className='font-semibold'>**** **** **** {item.last_four_digits}</span>
                      <div className="me-2">
                        <Radio
                          label=''
                          id={item.id}
                          checked={item.id === card?.id}
                          onChange={() => setCard(item)} />
                      </div>
                    </div>
                    <div className="w-full bg-black h-5" />
                  </div>
                  <span className='font-semibold ms-3'>{item.holder_name}</span>
                  <div className="flex ms-3 mb-3">
                    <span className='text-sm'>{item.expiration}</span>
                    <span className='text-sm ms-3'>***</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-5">
              <Button onClick={handlePrevius}>Anterior</Button>
              <Button onClick={handleNext}>Próximo</Button>
            </div>
          </>
          :
          <form onSubmit={handleSubmit}>
            <p className='text-sm my-5'>Crie um cartão ou
              <span className='font-bold text-sky-500 cursor-pointer' onClick={toggleShowForm}> selecione um existente</span>
            </p>
            <div className="grid grid-cols-6">
              <div className="mt-5 col-span-6 sm:col-span-3 sm:me-2">
                <Input
                  label="Nome do Titular"
                  name="holder_name"
                  value={form.holder_name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors?.holder_name} />
              </div>
              <div className="mt-5 col-span-6 sm:col-span-3 sm:mx-2">
                <Input
                  label="Documento do Títular"
                  name="holder_document"
                  value={documentMask(form.holder_document)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors?.holder_document} />
              </div>
            </div>

            <div className="grid grid-cols-8">
              <div className="mt-5 col-span-4 sm:me-2">
                <InputGroup
                  label="Número do Cartão"
                  name="number"
                  value={cardMask(form.number).mask}
                  onBlur={handleBlur}
                  onChange={handleCardChange}
                  error={errors?.number}
                  Group={
                    <div className="whitespace-nowrap rounded-r border border-s-0 border-solid border-neutral-200 text-center text-base font-normal leading-[1.6] text-surface dark:border-white/10 dark:text-white" style={{ minWidth: 50 }}>
                      <Brands brand={form.brand || 'nocard'} />
                    </div>
                  } />
              </div>
              <div className="mt-5 col-span-4 sm:col-span-2 sm:mx-2">
                <Input
                  label="Vencimento"
                  name="expiration"
                  placeholder='11/30'
                  value={expirationMask(form.expiration)}
                  onChange={handleChange}
                  error={errors?.expiration} />
              </div>
              <div className="mt-5 col-span-4 sm:col-span-2 sm:ms-2">
                <Input
                  label="CVV"
                  name="cvv"
                  placeholder='187'
                  value={numberMask(form.cvv)}
                  maxLength={cvvLength}
                  onChange={handleChange}
                  error={errors?.cvv} />
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

export default CardsForm