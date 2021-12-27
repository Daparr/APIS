import { Author } from '../types'
//import { authors } from '../mock'

const SERVER: string = 'https://garden-warehouse-api.herokuapp.com'

export const getAllItems = async (): Promise<Author[]> => {
  const res = await fetch(`${SERVER}/items`)
  const data = await res.json()
  return data as Author[]
}

export const createItem = async (item: Author): Promise<void> => {
  const data: any = { title: item.name }
  await fetch(`${SERVER}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const updateItem = async (item: Author): Promise<void> => {
  const { id, name } = item
  const data: any = { name }
  await fetch(`${SERVER}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const deleteItem = async (itemId: number): Promise<void> => {
  await fetch(`${SERVER}/items/${itemId}`, { method: 'DELETE' })
}