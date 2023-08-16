import { List, ListItem, ListItemButton, ListItemText, IconButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteHistory } from '../store/features/historySlice';
import { IHistoryItem } from '../store/features/historySlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { MouseEvent } from 'react';

interface IHistoryProps {
  goCalc?: (input: string) => void
}

export default function History({goCalc}: IHistoryProps) {
  const historyList = useAppSelector(state => state.history.list);
  const dispatch = useAppDispatch();

  const handleListItemClick = (item: IHistoryItem) => {
    if (item.type === 'calculator') {
      goCalc?.(item.expression);
    }
  }

  const deleteHistoryItem = (event: MouseEvent<HTMLElement>, item: IHistoryItem) => {
    event.stopPropagation();
    dispatch(deleteHistory(item.id));
  }
  
  return (
    <List>
      {
        historyList.length ? 
        <>
          {
            historyList.map(item => {
              return (
                <ListItem key={item.id} disablePadding>
                  <ListItemButton onClick={() => handleListItemClick(item)} sx={{padding: '0px 10px'}}>
                    <ListItemText primary={<p className='history__expression'>{item.expression + ' = ' + item.result}</p>} />
                    <IconButton onClick={event => deleteHistoryItem(event, item)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemButton>
                </ListItem>
              )
            })
          }
        </> : <ListItemText primary='History is empty' />
      }
    </List>
  );
}