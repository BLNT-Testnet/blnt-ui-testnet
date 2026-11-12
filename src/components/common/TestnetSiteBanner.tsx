import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, Typography, useTheme } from '@mui/material';
import { Networks } from '@stellar/stellar-sdk';
import { Banner } from './Banner';

const MAINNET_URL = 'https://blnt.trade/';

export const TestnetSiteBanner = () => {
  const theme = useTheme();
  const isTestnet = process.env.NEXT_PUBLIC_PASSPHRASE === Networks.TESTNET;

  if (!isTestnet) return null;

  return (
    <Banner
      sx={{
        width: 'calc(100% - 12px)',
        margin: '6px 6px 0',
        padding: '8px 12px',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.positive.opaque,
        border: `1px solid ${theme.palette.positive.main}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 420px' }}>
        <Typography variant="body2">
          You are viewing the BLNT Trade testnet site. Live mainnet markets are available at
          blnt.trade.
        </Typography>
      </Box>
      <Box
        component="a"
        href={MAINNET_URL}
        target="_blank"
        rel="noreferrer"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          minHeight: '32px',
          border: `1px solid ${theme.palette.positive.main}`,
          borderRadius: '5px',
          padding: '6px 10px',
          color: theme.palette.text.primary,
          fontSize: '0.875rem',
          fontWeight: 700,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          '&:hover': { backgroundColor: theme.palette.positive.opaque },
        }}
      >
        Open mainnet
        <OpenInNewIcon sx={{ fontSize: '1rem' }} />
      </Box>
    </Banner>
  );
};
