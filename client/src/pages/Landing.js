import React from 'react';
import { Button, Heading, Box, Paragraph, Image } from 'grommet';
import steamLogin from '../assets/steam-login.png';

const Landing = ({ login }) => {
  return (
    <Box
      flex
      align="center"
      direction="column"
      justify="center"
      background="background"
    >
      <Heading
        level="1"
        margin={{ bottom: 'medium' }}
        color="lightPurp"
        textAlign="center"
      >
        Welcome to GameFlow!
      </Heading>
      <Paragraph
        textAlign="center"
        margin={{ bottom: 'medium' }}
        color="lightGray"
      >
        This app needs you to log in to Steam for it to work. Be sure to set
        your privacy settings to public. All we use is your game library and
        your Steam ID.
      </Paragraph>
      <Button onClick={login}>
        <Image fit="cover" src={steamLogin} />
      </Button>
    </Box>
  );
};

export default Landing;
