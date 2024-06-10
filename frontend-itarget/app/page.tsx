import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className="text-3xl font-bold mt-4">Bem-vindo!</h1>
        <p className="text-gray-600 mt-2 mb-6 text-center">
          Escolha uma opção abaixo para continuar:
        </p>
        <div className="flex flex-col space-y-4 w-full">
          <a
            href="/inscritos"
            className="w-full text-center py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-colors"
          >
            Ver Inscrições
          </a>
          <a
            href="/register"
            className="w-full text-center py-3 px-4 rounded-lg bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-colors"
          >
            Se Inscrever
          </a>
        </div>
      </div>
    </main>
  );
}
