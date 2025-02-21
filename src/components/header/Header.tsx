import { Progress } from 'antd';
import aviaLogo from '../../assets/images/aviaLogo.svg';
import { RootState } from '../../store/store';
import { useAppSelector } from '../../store/hooks';
import styles from './Header.module.scss';

const HeaderComponent = () => {
  const progress = useAppSelector((state: RootState) => state.tickets.progress);
  const { loading } = useAppSelector((state: RootState) => state.tickets);

  return (
    <header className={styles.header__container}>
      <img className={styles.header__image_logo} src={aviaLogo} alt="Logo" />
      {loading && (
        <Progress
          percent={progress}
          showInfo={false}
          style={{
            position: 'fixed',
            top: '-13px',
            width: '100vw',
          }}
        />
      )}
    </header>
  );
};
export default HeaderComponent;
