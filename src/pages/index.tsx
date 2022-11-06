import Head from 'next/head';
import Image from 'next/image';

import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/users-avatar-example.png';
import iconCheckImg from '../assets/icon-check.svg';
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';
import { GetStaticProps } from 'next';

interface HomeProps {
  poolCount: number;
  userCount: number;
  guessCount: number;
}

export default function Home({ poolCount, userCount, guessCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');

  const createPool = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      });

      const { code } = response.data;
      await navigator.clipboard.writeText(code);

      alert('Bolão criado com sucesso, código copiado para a área de transferência!');
      setPoolTitle('');
    } catch (error) {
      console.error(error);
      alert('Erro ao criar o bolão, tente novamente.');
    }
  };

  return (
    <>
      <Head>
        <title>Bolão Web - NLW Copa 2022</title>
        <meta name="description" content="Bolão Web - NLW Copa 2022" />
      </Head>

      <div className="max-w-[1124px] mx-auto h-screen grid grid-cols-2 items-center gap-28 px-2">
        <main>
          <Image src={logoImg} alt="Bolão Web - NLW Copa 2022" />

          <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
            Crie seu próprio bolão da Copa e compartilhe entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarExampleImg} alt="Usuários" />
            <strong className="text-gray-100 text-lg">
              <span className="text-ignite-500"> +{userCount}</span> pessoas já estão usando
            </strong>
          </div>

          <form onSubmit={createPool} className="mt-10 flex gap-2">
            <input
              type="text"
              placeholder="Qual o nome do bolão?"
              className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
              onChange={(event) => setPoolTitle(event.target.value)}
              value={poolTitle}
            />
            <button
              type="submit"
              className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            >
              Criar meu bolão
            </button>
          </form>

          <p className="text-gray-300 mt-4 text-sm leading-relaxed">
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras
            pessoas.
          </p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="Ícone de check" />

              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{poolCount}</span>
                <span className="text-sm">Bolões criados</span>
              </div>
            </div>

            <div className="w-px h-14 bg-gray-600" />

            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="Ícone de check" />

              <div className="flex flex-col">
                <span className="font-bold text-2xl">+{guessCount}</span>
                <span className="text-sm">Palpites enviados</span>
              </div>
            </div>
          </div>
        </main>

        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia da aplicação NLW Copa 2022"
          quality={100}
        />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
