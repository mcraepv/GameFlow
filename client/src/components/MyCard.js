import React from 'react';
import {
  Card,
  Button,
  Box,
  CardBody,
  Paragraph,
  CardHeader,
  Image,
  Heading,
} from 'grommet';
import { Favorite } from 'grommet-icons';

const MyCard = (props) => {
  const imageStyle = {
    height: '160px',
  };

  return (
    <Card
      height="medium"
      elevation="none"
      width={{ min: '200px', max: '250px' }}
      background="card"
      margin="small"
    >
      <CardHeader>
        <Image fill={true} src={props.image} fit="cover" style={imageStyle} />
      </CardHeader>
      <CardBody pad="medium" align="center">
        {props.tag ? (
          <Paragraph color="lightPurp" margin="none" textAlign="center">
            {props.text}
          </Paragraph>
        ) : (
          <Heading level="4" margin="none" color="lightPurp" textAlign="center">
            {props.text}
          </Heading>
        )}
      </CardBody>
      {props.tag ? (
        <Box pad="small">
          <Button
            hoverIndicator
            onClick={() => {
              props.clickHandler(props.tag);
            }}
            alignSelf="center"
          >
            {props.btnText}
          </Button>
        </Box>
      ) : (
        <Box pad="small">
          <Button
            hoverIndicator
            onClick={() => {
              props.clickHandler(props.text);
            }}
            alignSelf="center"
            icon={<Favorite color="lightPurp" />}
          />
        </Box>
      )}
    </Card>
  );
};

export default MyCard;
