import React from 'react';
import {Typography} from '@material-ui/core';

export default function Title({className, children, ...props}) {
  return (
    <Typography component="h1" variant="h6" className={className} {...props} >
      {children}
    </Typography>
  );
}