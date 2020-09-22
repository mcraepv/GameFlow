import React from 'react';
import {
  Card,
  Button,
  Box,
  CardFooter,
  CardBody,
  Paragraph,
  CardHeader,
  Image,
} from 'grommet';

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
        <Paragraph color="lightPurp" margin="none" textAlign="center">
          {props.text}
        </Paragraph>
      </CardBody>
      {props.tag ? (
        <Box pad="small">
          <Button
            hoverIndicator
            secondary
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
            secondary
            onClick={() => {
              props.clickHandler();
            }}
            alignSelf="center"
          >
            {props.btnText}
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default MyCard;
