import { Spin } from 'antd';
import aviaLogo from '../../assets/images/aviaLogo.svg';
import { RootState } from '../../store/store';
import { useAppSelector } from '../../store/hooks';

import styles from './Header.module.scss';

const HeaderComponent = () => {
  const { loading } = useAppSelector((state: RootState) => state.tickets);

  return (
        <header className={styles.header__container}>
            <img className={styles.header__image_logo} src={aviaLogo} alt='Logo' />
            {loading
            && <Spin size="large" style={{ position: 'absolute', left: '150px', top: '0' }}>
              {<p style={{ position: 'absolute', left: '125px', top: '50px' }}>Loader...</p>}
              </Spin>
            }
        </header>
  );
};
export default HeaderComponent;
