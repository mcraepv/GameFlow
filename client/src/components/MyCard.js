import { FormPrevious } from 'grommet-icons';
import React from 'react';
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  Heading,
  Paragraph,
} from 'grommet';
import { Favorite, ShareOption } from 'grommet-icons';

const MyCard = (props) => {
  return (
    <Card
      height="medium"
      elevation="none"
      width="medium"
      background="card"
      margin={{ horizontal: 'medium' }}
    >
      <CardHeader pad="medium">
        <Heading level="4" margin="none" color="lightPurp">
          Header
        </Heading>
      </CardHeader>
      <CardBody pad="medium">
        <Paragraph color="lightPurp" margin="none">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Paragraph>
      </CardBody>
      <CardFooter pad={{ horizontal: 'small' }} background="lightGray">
        <Button icon={<Favorite color="red" />} hoverIndicator />
        <Button icon={<ShareOption color="plain" />} hoverIndicator />
      </CardFooter>
    </Card>
  );
};

export default MyCard;
