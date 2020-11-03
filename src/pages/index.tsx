import React from 'react';
import { GetServerSideProps } from 'next';

import axios from '../api';

import {
  Container,
  Title,
  ContentSection,
  List,
  ListItem,
} from '../styles/Home/styles';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

const Home = ({ recommendedProducts }: HomeProps) => {
  return (
    <Container>
      <ContentSection>
        <Title>Products</Title>
        <List>
          {recommendedProducts.map((item) => (
            <ListItem key={item.id}>{item.title}</ListItem>
          ))}
        </List>
      </ContentSection>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await axios.get('/recommended');

  const recommendedProducts = response.data;

  return {
    props: {
      recommendedProducts,
    },
  };
};

export default Home;
