import { Author } from '../types'
//import { authors } from '../mock'

const SERVER: string = 'https://garden-warehouse-api.herokuapp.com'

export const getAllAuthors = async (): Promise<Author[]> => {
  const res = await fetch(`${SERVER}/authors`)
  const data = await res.json()
  return data as Author[]
}

export const createAuthor = async (item: Author): Promise<void> => {
  const data: any = { title: item.name }
  await fetch(`${SERVER}/authors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const updateAuthor = async (item: Author): Promise<void> => {
  const { id, name } = item
  const data: any = { name }
  await fetch(`${SERVER}/authors/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const deleteAuthor = async (itemId: number): Promise<void> => {
  await fetch(`${SERVER}/authors/${itemId}`, { method: 'DELETE' })
}