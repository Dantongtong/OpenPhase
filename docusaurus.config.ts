import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/icon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://Dantongtong.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/OpenPhase/',   
  deploymentBranch: 'gh-pages',  
  trailingSlash: false,
  organizationName: 'Dantongtong', 
  projectName: 'OpenPhase',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    image: 'img/logo.png',
    navbar: {
      title: 'OpenPhase',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.png',
        href: '/docs/module', 
        target: '_self',
      },
      items: [
        {
          to: '/docs/module', 
          label: 'WorkFlow', 
          position: 'left'
        },
        {
          to: '/docs/phase-system', 
          label: 'Tasks', 
          position: 'left'
        },
        {
          to: '/docs/dataset', 
          label: 'Dataset', 
          position: 'left'
        },
        {
          to: '/docs/experimental-conditions', 
          label: 'System', 
          position: 'left'
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} OpenPhase.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
