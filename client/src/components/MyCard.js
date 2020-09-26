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
import { Favorite, SubtractCircle } from 'grommet-icons';

const MyCard = (props) => {
  const imageStyle = {
    height: '160px',
  };

  return (
    <Card
      height={props.tag ? 'medium' : '290px'}
      elevation="none"
      width={{ min: '200px', max: '250px' }}
      background="card"
      margin="small"
      className="card"
      animation={['fadeIn', 'zoomIn']}
    >
      <CardHeader>
        <Image fill={true} src={props.image} fit="cover" style={imageStyle} />
      </CardHeader>
      <CardBody pad="medium" align="center">
        {props.tag ? (
          <Paragraph margin="none" textAlign="center">
            {props.text}
          </Paragraph>
        ) : (
          <Heading level="4" margin="none" textAlign="center">
            {props.text}
          </Heading>
        )}
      </CardBody>
      {props.tag ? (
        <Box pad="small">
          <Button
            hoverIndicator
            onClick={() => {
              props.tested
                ? props.clickHandler(props.tag, props.tested)
                : props.clickHandler(props.tag);
            }}
            alignSelf="center"
            primary
          >
            {props.btnText}
          </Button>
        </Box>
      ) : !props.isFavorite ? (
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
      ) : (
        <Box pad="small">
          <Button
            hoverIndicator
            onClick={() => {
              props.clickHandler(props.text);
            }}
            alignSelf="center"
            icon={<SubtractCircle color="lightPurp" />}
          />
        </Box>
      )}
    </Card>
  );
};

export default MyCard;
