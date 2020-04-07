import React, { useState } from 'react';
import { StatusBar } from 'react-native';

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  ProductName,
  ProblemsList,
  ProblemItem,
  ProblemDescription,
  ProblemDate,
} from './styles';

export default function Problems() {
  const [problems] = useState([
    {
      id: 1,
      description: 'Destinatário ausente',
      date: '14/01/2020',
    },
    {
      id: 2,
      description: 'Destinatário ausente',
      date: '14/01/2020',
    },
  ]);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <HeaderExtented />
        <Content>
          <ContentOverlap>
            <ProductName>Encomenda 01</ProductName>
            <ProblemsList
              data={problems}
              keyExtractor={(problem) => String(problem.id)}
              renderItem={({ item }) => (
                <ProblemItem>
                  <ProblemDescription>{item.description}</ProblemDescription>
                  <ProblemDate>{item.date}</ProblemDate>
                </ProblemItem>
              )}
            />
          </ContentOverlap>
        </Content>
      </Container>
    </>
  );
}
