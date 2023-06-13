import React from 'react';
import { Box } from '@material-ui/core';
import LogoImage from '@/assets/images/aksihijau.svg';

interface Props {
    sx?;
}

const Logo = (props: Props): JSX.Element => {
    const { sx } = props;
    return <Box component="img" src={LogoImage} sx={{ width: 50, height: 50, ...sx }} />;
};

export default Logo;
