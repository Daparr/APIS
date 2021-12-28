import { Article } from '../types'
//import { articles } from '../mock'

const SERVER: string = 'https://apis-db.herokuapp.com'

export const getAllArticles = async (): Promise<Article[]> => {
  const res = await fetch(`${SERVER}/items`)
  const data = await res.json()
  return data as Article[]
}

export const createArticle = async (article: Article): Promise<void> => {
  const data: any = { name: article.name, content: article.content, autor: article.autor}
  await fetch(`${SERVER}/items/new`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const updateArticle = async (article: Article): Promise<void> => {
  const { id } = article
  const data: any = { name: article.name, content: article.content, autor: article.autor}
  await fetch(`${SERVER}/item/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export const deleteArticle = async (articleId: number): Promise<void> => {
  await fetch(`${SERVER}/item/${articleId}`, { method: 'DELETE' })
}