import { FormEvent } from 'react'

export default function Form({
  errorMessage,
  onSubmit,
}: {
  errorMessage: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>email e senha</span>
        <input type="text" name="username" defaultValue="fabiano@arpainformatica.com.br" required />
        <input type="text" name="password" defaultValue="Arpa2010" required />
      </label>

      <button type="submit">Login</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>
  )
}
