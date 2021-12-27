import { Article } from '../types'
//import { articles } from '../mock'

const SERVER: string = 'https://apis-db.herokuapp.com/'

export const getAllClients = async (): Promise<Article[]> => {
  const res = await fetch(`${SERVER}/clients`)
  const data = await res.json()
  return data as Article[]
}

export const createClient = async (client: Article): Promise<void> => {
  const data: any = { full_name: client.article_name }
  await fetch(`${SERVER}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const updateClient = async (client: Article): Promise<void> => {
  const { id, article_name } = client
  const data: any = { article_name }
  await fetch(`${SERVER}/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const deleteClient = async (clientId: number): Promise<void> => {
  await fetch(`${SERVER}/clients/${clientId}`, { method: 'DELETE' })
}