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
