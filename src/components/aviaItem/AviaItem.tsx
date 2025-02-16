// AviaItem.tsx
import styles from './AviaItem.module.scss';
import { Ticket } from '../../api/fetchApi';

export interface AviaItemProps {
   ticket: Ticket;
}

const AviaItem: React.FC<AviaItemProps> = ({ ticket }) => (
    <li className={styles.card_item}>
        <div className={styles.card_wrapper}>
            <div className={styles.header_card}>
                <span className={styles.card_price}>{ticket.price}₽</span>
                <img
                    className={styles.card_logo}
                    alt={ticket.carrier}
                    src={`http://pics.avs.io/99/36/${ticket.carrier}.png`}
                />
            </div>
            <div className={styles.card_body}>
                {ticket.segments.map((segment, index) => {
                  const departureTime = new Date(segment.date);
                  const arrivalTime = new Date(departureTime.getTime() + segment.duration * 60000);

                  return (
                        <div className={styles.card_segment_layout} key={index}>
                            <div className={styles.layout_body}>
                                <span className={styles.card__info_title}>
                                    {segment.origin} – {segment.destination}
                                </span>
                                <span className={styles.card__info_desc}>
                                    {departureTime.toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })} –
                                    {arrivalTime.toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                </span>
                            </div>
                            <div className={styles.layout_body}>
                                <span className={styles.card__info_title}>В пути</span>
                                <span className={styles.card__info_desc}>
                                    {Math.floor(segment.duration / 60)}ч {segment.duration % 60}м
                                </span>
                            </div>
                            <div className={styles.layout_body}>
                                <span className={styles.card__info_title}>
                                {segment.stops.length > 0
                                  ? `${segment.stops.length} пересадки`
                                  : ''}
                                </span>
                                <span className={styles.card__info_desc}>
                                    {segment.stops.length > 0
                                      ? segment.stops.join(', ')
                                      : 'Без пересадок'}
                                </span>
                            </div>
                        </div>
                  );
                })}
            </div>
        </div>
    </li>
);

export default AviaItem;
