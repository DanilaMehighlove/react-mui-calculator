import { Box, ToggleButtonGroup, ToggleButton, IconButton, Badge } from '@mui/material';
import { Theme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { MouseEvent, useState } from 'react';
import Calculator from './Calculator';
import Converter from './Converter';
import History from './History';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { IHistoryItem, selectHistoryItem } from '../store/features/historySlice';

type toolType = 'calculator' | 'converter' | 'history';

interface IToolInputs {
  changeMode: () => void;
  theme: Theme;
}

export default function Tool({changeMode, theme}: IToolInputs) {
  const [tool, setTool] = useState<toolType>('calculator');
  const calcDefaultValue = useAppSelector(state => state.history.selectedHistory?.expression ?? '');
  const dispatch = useAppDispatch();
  const historyLength = useAppSelector(state => state.history.list.length);

  const handleToolChange = (
    event: MouseEvent<HTMLElement>,
    newTool: toolType
  ) => {
    dispatch(selectHistoryItem(null))
    if (newTool) setTool(newTool);
  }

  const setCalcDefault = (item: IHistoryItem) => {
    dispatch(selectHistoryItem(item))
    setTool('calculator');
  }

  const changeTools = (tool: toolType): JSX.Element => {
    switch(tool) {
      case 'calculator': return <Calculator defaultInput={calcDefaultValue} />;
      case 'converter': return <Converter />;
      case 'history': return <History goCalc={setCalcDefault} />;
      default: return <></>;
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        rowGap: 2,
        flexDirection: 'column',
        alignItems: 'center',
        width: 'min-content'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          columnGap: 1.5,
          alignItems: 'center'
        }}
      >
        <ToggleButtonGroup
          size='small'
          color="primary"
          value={tool}
          exclusive
          onChange={handleToolChange}
          aria-label="tool"
        >
          <ToggleButton value="history">
            <Badge
              sx={{ position: 'unset' }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              badgeContent={historyLength}
              color="primary"
            >
              history  
            </Badge>
          </ToggleButton>
          <ToggleButton value="calculator">calculator</ToggleButton>
          <ToggleButton disabled value="converter">converter</ToggleButton>
        </ToggleButtonGroup>
        <IconButton
          aria-label={theme.palette.mode === 'light' ? 'light mode' : 'dark mode'}
          onClick={() => changeMode()}
        >
          {
            theme.palette.mode === 'light' ?
            <LightModeIcon /> :
            <DarkModeIcon />
          }
        </IconButton>
      </Box>
      <Box
        sx={{
          height: 450,
          width: '100%'
        }}
      >
        { changeTools(tool) }
      </Box>
    </Box>
  )
}