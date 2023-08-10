import { Box, TextField, Grid, styled, Button } from '@mui/material';
import { ChangeEvent, useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import BackspaceIcon from '@mui/icons-material/Backspace';

const CButton = styled(Button)({
  height: '4.5em',
  width: '4.5em',
  minHeight: '4.5em',
  minWidth: '4.5em',
  borderRadius: '100%'
});

const buttons = [
  '(', ')', '!', '/',
  '7', '8', '9', '*',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  'C', '0', 'R', '='
];

const ModifiedTextField = styled(TextField)({
  '& .MuiFormHelperText-root': {
    textAlign: 'right'
  }
});

export default function Calculator() {
  const [inputValue, setInputValue] = useState('');
  const [expressionResult, setExpressionResult] = useState(' ');

  useEffect(() => {
    try {
      const result = evaluate(inputValue);
      let helperText = '= ' + result;

      if (result === undefined) {
        helperText = ' ';
      }

      setExpressionResult(helperText);
      
    } catch(e) {
      setExpressionResult(' ');
    }
  }, [inputValue]);

  const handleButtonClick = (value: string) => {
    switch(value) {
      case 'C': return setInputValue('');
      case 'R': return setInputValue(prev => prev.slice(0, prev.length - 1))
      case '=': {
        try {
          const result = evaluate(inputValue) + '';
          return setInputValue(result);
        } catch(e) {
          return setExpressionResult('Wrong expression');
        }
      }
    }

    setInputValue(prev => prev + value);
  }

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // rowGap: 2
      }}
    >
      <ModifiedTextField
        autoComplete='off'
        value={inputValue}
        onChange={handleInput}
        fullWidth
        variant="outlined"
        helperText={expressionResult}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          justifyContent: 'space-between'
        }}
      >
        {
          buttons.map(button =>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {
                button === 'R' ?
                <CButton onClick={() => handleButtonClick(button)}>
                  <BackspaceIcon />
                </CButton> :
                <CButton onClick={() => handleButtonClick(button)}>{button}</CButton>
              }
            </Box>
          )
        }
      </Box>
    </Box>
  );
}