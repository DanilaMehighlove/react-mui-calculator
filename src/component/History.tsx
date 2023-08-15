import { useAppSelector } from '../store/hooks';

export default function History() {
  const historyList = useAppSelector(state => state.history.list);
  
  return (
    <>
      {
        historyList.map(rec => <p key={rec.id}>{rec.text}</p>)
      }
    </>
  );
}