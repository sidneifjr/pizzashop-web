import { api } from '@/lib/axios'

interface GetManagedRestaurant {
  name: string
  id: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurant>('/managed-restaurant')

  return response.data
}
