import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Schema for validating my data format.
 */
const signInForm = z.object({
  email: z.string().email(),
})

/**
 * 'infer' converts the schema format to TypeScript typing.
 */
type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  /**
    1) React Query facilitates communication between frontend and backend.

    It allows low-level customization of several aspects in our request: retry, network mode (in case the user is offline), among others.

    2) useMutation is used when a mutation is needed.

    With useMutation, several informations about the request are easily acessible: submittedAt, status, isPending, isError, failureCount, etc.

    3) Mutation is every action that is not a listing action (or that returns something).

    - Actions using POST, PUT ou DELETE are a mutation.
    
    - Actions using GET are a query.

    4) mutateAsync is the function used to fire the function defined in "mutationFn" (in this case, SignIn).

    Renaming mutateAsync during import might be interesting, since it's possible to have several mutations in the same file.
 */
  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      console.log(data)

      // throw new Error() // Forces an error, leading to the 'catch' block.

      // A url will be generated in the backend's console log. Open it and check for the "auth" value in cookies.
      await authenticate({ email: data.email })

      toast.success('Enviamos um link de autenticação para seu e-mail.', {
        description: 'Check your inbox!',
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        {/**
         * 'asChild' uses the slot from Radix, to send all styles from 'Button' to its child component (Link).
         */}
        <Button variant="outline" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>

        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>

            <p className="text-small text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          {/**
           * Higher order function => a function that receives another one as an argument.
           */}
          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
