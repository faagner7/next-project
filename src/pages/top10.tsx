import React from 'react';
import { GetStaticProps } from 'next';

import axios from '../api';

interface IProduct {
  id: string;
  title: string;
}

interface Top10Props {
  products: IProduct[];
}

const Top10 = ({ products }: Top10Props) => {
  return (
    <div>
      <h1>Top 10</h1>

      <ul>
        {products.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Top10;

export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
  const response = await axios.get('/products');

  const products = response.data;

  return {
    props: {
      products,
    },
    revalidate: 60,
    // atualiza a versão da página estática a cada 60s;
    // obs: se tiver 1000 requisições a cada segundo, com esse método teriamos apenas 12 chamadas;
  };
};
