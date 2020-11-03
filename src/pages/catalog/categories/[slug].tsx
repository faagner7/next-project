import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import axios from '../../../api';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: categories } = await axios.get('/categories');

  const paths = categories.map((category) => {
    return {
      params: {
        slug: category.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context
) => {
  const { slug } = context.params;

  const response = await axios.get(`/products?category_id=${slug}`);
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
