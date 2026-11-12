import { Typography, useTheme } from '@mui/material';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Divider } from '../components/common/Divider';
import { Row } from '../components/common/Row';
import { SectionBase } from '../components/common/SectionBase';
import { ToggleSlider } from '../components/common/ToggleSlider';
import { MarketsList } from '../components/markets/MarketsList';
import { useSettings } from '../contexts';
import { ENABLED_VERSIONS, LATEST_VERSION, Version } from '../utils/version';

const Markets: NextPage = () => {
  const theme = useTheme();
  const { lastPool } = useSettings();

  const [version, setVersion] = useState<Version | undefined>(undefined);

  useEffect(() => {
    if (lastPool?.version && ENABLED_VERSIONS.includes(lastPool.version)) {
      setVersion(lastPool.version);
    } else {
      setVersion(LATEST_VERSION);
    }
  }, [lastPool]);

  return (
    <>
      <Row sx={{ alignItems: 'center' }}>
        <SectionBase type="alt" sx={{ margin: '6px', padding: '6px' }}>
          Markets
        </SectionBase>
        {ENABLED_VERSIONS.length > 1 && version !== undefined && (
          <ToggleSlider
            options={ENABLED_VERSIONS.map((option) => ({
              optionName: option,
              palette:
                option === Version.V1
                  ? theme.palette.primary
                  : option === Version.V3
                  ? theme.palette.positive
                  : theme.palette.backstop,
            }))}
            selected={version}
            changeState={setVersion}
            sx={{
              height: '24px',
              width: `${44 * ENABLED_VERSIONS.length}px`,
              marginRight: '6px',
            }}
          />
        )}
      </Row>
      <SectionBase type="alt" sx={{ margin: '6px', padding: '12px' }}>
        <Typography component="p" variant="body2">
          BLNT Trade Testnet showcases BLNT V3, a Blend-derived lending protocol on Stellar
          designed for permissionless lending and real-world assets. Explore example markets
          including Fixed Pool V3, No Backstop, Traditional, Permissioned, and SEP-41 Assets.
          V1/V2/V2.1 are Blend testnet markets.
        </Typography>
      </SectionBase>
      <Divider />
      <MarketsList version={version} />
    </>
  );
};

export default Markets;
