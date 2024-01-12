import React from 'react';
import {Dialog, DialogContent, DialogTitle, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';
import {Icon} from "@iconify/react";

export interface BaseDialogProps {
  open: boolean;
  title: string;
  handleClose: () => any;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md';
  maxCustomWidth?: string;
  fixedHeight?: string;
  noPadding?: boolean;
  footer?: React.ReactNode;
}

export const BaseDialog = ({
                             open,
                             title,
                             handleClose,
                             children,
                             maxWidth,
                             maxCustomWidth,
                             fixedHeight,
                             noPadding,
                             footer
                           }: BaseDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={maxWidth ?? 'sm'}
      PaperProps={{sx: {height: fixedHeight || 'auto'}}}
      sx={{maxWidth: maxCustomWidth ?? '100%', margin: '0 auto'}}>
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '0.5px solid #c6c6c6',
          marginBottom: '16px',
          padding: '8px 16px '
        }}>
        <Typography
          variant={'h5'}
          sx={{textTransform: 'capitalize', display: 'flex', alignItems: 'center'}}>
          {title}
        </Typography>
        <IconButton onClick={handleClose}>
          <Icon icon={'mdi:close'}/>
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{
        padding: noPadding ? '0' : '16px',
        position: 'relative',
      }}>
        <div style={{
          width: '100%', display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>{children}</div>
      </DialogContent>
      {footer && <DialogActions>{footer}</DialogActions>}
    </Dialog>
  );
};
