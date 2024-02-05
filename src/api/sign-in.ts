// A intenção deste arquivo é definir manualmente as tipagens de nossas requisições; tal tarefa é feita de forma automática por ferramentas como TRPC ou GraphQL.
/**
 * Each request gets one file.
 */
import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  /**
   * "/authenticate" is the route used for backend authentication.
   */
  await api.post('/authenticate', { email })
}
