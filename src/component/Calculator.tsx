import { Box, ToggleButtonGroup, ToggleButton, Button, IconButton } from '@mui/material';
import { Theme, styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { MouseEvent, useState } from 'react';
import Grid from '@mui/material/Grid';

type toolType = 'calculator' | 'converter';

interface ICalculatorInputs {
  changeMode: () => void,
  theme: Theme
}

const CButton = styled(Button)({
  height: '4.5em',
  width: '4.5em',
  minHeight: '4.5em',
  minWidth: '4.5em',
  borderRadius: '100%'
});

const buttons = [
  '(', ')', '!', '/',
  '7', '8', '9', 'X',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  'D', '0', 'R', '='
];

export default function Calculator({changeMode, theme}: ICalculatorInputs) {
  const [tool, setTool] = useState<toolType>('calculator');

  const handleToolChange = (
    event: MouseEvent<HTMLElement>,
    newTool: toolType
  ) => {
    setTool(newTool);
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
        <IconButton aria-label="history">
          <MenuIcon />
        </IconButton>
        <ToggleButtonGroup
          color="primary"
          value={tool}
          exclusive
          onChange={handleToolChange}
          aria-label="tool"
        >
          <ToggleButton value="calculator">calculator</ToggleButton>
          <ToggleButton value="converter">converter</ToggleButton>
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
      <Grid
        className='buttons'
        container
        spacing={1}
      >
        {
          buttons.map(button =>
            <Grid item xs={3}>
              <CButton key={button}>{button}</CButton>
            </Grid>
          )
        }
      </Grid>
    </Box>
  )
}