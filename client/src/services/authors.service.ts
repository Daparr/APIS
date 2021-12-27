import { Author } from '../types'
import { authors } from '../mock'

export const getAllAuthors = async (): Promise<Author[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return authors
}

export const createAuthor = async (item: Author): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const ids: number[] = authors.map((item) => item.id)
  item.id = Math.max(...ids) + 1
  authors.push(item)
}

export const updateAuthor = async (item: Author): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const itemIdx: number = authors.findIndex((_item) => _item.id === item.id)
  authors[itemIdx] = item
}

export const deleteAuthor = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const itemIdx: number = authors.findIndex((_item) => _item.id === id)
  authors.splice(itemIdx, 1)
}
