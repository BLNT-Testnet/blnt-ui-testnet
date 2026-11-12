import '/public/fonts/dm-sans.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { Networks } from '@stellar/stellar-sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React, { useState } from 'react';
import { SettingsProvider } from '../contexts';
import { WalletProvider } from '../contexts/wallet';
import DefaultLayout from '../layouts/DefaultLayout';
import theme from '../theme';

const MAINNET_SITE_URL = 'https://blnt.trade';
const TESTNET_SITE_URL = 'https://blent.trade';
const ORGANIZATION_ID = `${MAINNET_SITE_URL}/#organization`;

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient());
  const isTestnet = process.env.NEXT_PUBLIC_PASSPHRASE === Networks.TESTNET;
  const siteName = isTestnet ? 'BLNT Trade Testnet' : 'BLNT Trade';
  const siteUrl = isTestnet ? TESTNET_SITE_URL : MAINNET_SITE_URL;
  const defaultTitle = isTestnet
    ? 'BLNT Trade Testnet | Lending Markets on Stellar'
    : 'BLNT Trade | Lending Markets on Stellar';
  const defaultDescription = isTestnet
    ? 'Explore BLNT V3 example markets and Blend V1, V2, and V2.1 markets on Stellar testnet, including configurable backstops and real-world asset support.'
    : 'Explore BLNT V3, a Blend-derived lending protocol for permissionless lending and real-world assets, alongside Blend V1, V2, and V2.1 markets on Stellar.';
  const pageMetadata: Record<string, { title: string; description: string }> = {
    '/': { title: defaultTitle, description: defaultDescription },
    '/backfill': {
      title: `BLNT Backfill Claims | ${siteName}`,
      description:
        'Review BLNT backfill emissions, contributor grants, and lockup allocations through the BLNT Trade testnet interface.',
    },
    '/termsofservice': {
      title: `Terms of Use | ${siteName}`,
      description:
        'Read the terms governing access to the BLNT Trade testnet interface for BLNT V3 and supported Blend markets on Stellar.',
    },
  };
  const isIndexable = Object.prototype.hasOwnProperty.call(pageMetadata, props.router.pathname);
  const metadata = pageMetadata[props.router.pathname] ?? {
    title: defaultTitle,
    description: defaultDescription,
  };
  const canonicalPath =
    props.router.pathname === '/' ? '/' : `${props.router.pathname.replace(/\/$/, '')}/`;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ID,
        name: 'BLNT Protocol',
        url: `${MAINNET_SITE_URL}/`,
        sameAs: ['https://github.com/BLNT-Protocol'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: siteName,
        url: `${siteUrl}/`,
        description: defaultDescription,
        publisher: { '@id': ORGANIZATION_ID },
      },
      {
        '@type': 'WebApplication',
        '@id': `${siteUrl}/#application`,
        name: siteName,
        url: `${siteUrl}/`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        description: defaultDescription,
        publisher: { '@id': ORGANIZATION_ID },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="robots" content={isIndexable ? 'index,follow' : 'noindex,follow'} />
        {isIndexable && <link rel="canonical" href={canonicalUrl} />}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${siteUrl}/icon-512x512.png`} />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:alt" content="BLNT logo" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={`${siteUrl}/icon-512x512.png`} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#001812" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SettingsProvider>
            <WalletProvider>
              <CssBaseline />
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </WalletProvider>
          </SettingsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
