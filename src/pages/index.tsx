import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import OpenProteinModules from '@site/src/components/OpenProteinModules/OpenProteinModules';

export default function Home(): ReactNode {
  return (
    <Layout
      title='Home'
      description="Module content as homepage">
      <main>
        <OpenProteinModules />
      </main>
    </Layout>
  );
}
