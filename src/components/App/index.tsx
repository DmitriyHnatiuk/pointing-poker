import React from 'react';

import Footer from 'components/common/Footer';
import Header from 'components/common/Header';
import Main from 'components/common/Main';

// import styles from './index.module.scss';

const App: React.FC = (): JSX.Element => (
	<>
		<Header />
		{/* <<div id="content" className={styles.title}>
			Lets start our small project
		</div>> */}
		<Main />
		<Footer />
	</>
);

export default App;
