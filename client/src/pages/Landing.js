import React from 'react';
import { Button, Heading, Box, Paragraph } from 'grommet';

const Landing = () => {
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
        margin={{ bottom: 'large' }}
        color="lightPurp"
        textAlign="center"
      >
        Welcome to GameFlow!
      </Heading>
      <Paragraph textAlign="center" margin="none" color="lightGray">
        This app needs you to log in to Steam for it to work. Be sure to set
        your privacy settings to public. All we use is your game library and
        your Steam ID.
      </Paragraph>
      {/* <Button></Button> */}
    </Box>
  );
};

export default Landing;
