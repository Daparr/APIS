import { Article } from '../types'
import { articles } from '../mock'

export const getAllArticles = async (): Promise<Article[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return articles
}

export const createArticle = async (client: Article): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const ids: number[] = articles.map((client) => client.id)
  client.id = Math.max(...ids) + 1
  articles.push(client)
}

export const updateArticle = async (client: Article): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const clientIdx: number = articles.findIndex((item) => item.id === client.id)
  articles[clientIdx] = client
}

export const deleteArticle = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const clientIdx: number = articles.findIndex((item) => item.id === id)
  articles.splice(clientIdx, 1)
}
