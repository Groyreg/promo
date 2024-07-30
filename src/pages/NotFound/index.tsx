import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import { Clip, Digit, ErrorContainer, ErrorMsg, ErrorText, Shadow, Triangle, Wrapper } from './styles';

const NotFound = (): ReactElement => {
  const history = useHistory();
  const [firstDigit, setFirstDigit] = useState<number>(0);
  const [secondDigit, setSecondDigit] = useState<number>(0);
  const [thirdDigit, setThirdDigit] = useState<number>(0);

  const createAnimation = (): (() => void) => {
    let i = 0;
    const time = 30;

    const createLoopOne = (): void => {
      if (i > 100) {
        clearInterval(loop1);
        setFirstDigit(4);
      } else {
        setFirstDigit(randomNum());
        i += 1;
      }
    };

    const createLoopTwo = (): void => {
      if (i > 80) {
        clearInterval(loop2);
        setSecondDigit(0);
      } else {
        setSecondDigit(randomNum());
        i += 1;
      }
    };

    const createLoopThree = (): void => {
      if (i > 40) {
        clearInterval(loop3);
        setThirdDigit(4);
      } else {
        setThirdDigit(randomNum());
        i += 1;
      }
    };

    const loop1 = setInterval(createLoopOne, time);
    const loop2 = setInterval(createLoopTwo, time);
    const loop3 = setInterval(createLoopThree, time);

    return (): void => {
      clearInterval(loop1);
      clearInterval(loop2);
      clearInterval(loop3);
    };
  };

  const randomNum = (): number => Math.floor(Math.random() * 9) + 1;

  useEffect(createAnimation, []);

  return (
    <Wrapper>
      <ErrorContainer>
        <Clip>
          <Shadow type="third">
            <Digit type="third">{thirdDigit}</Digit>
          </Shadow>
        </Clip>
        <Clip>
          <Shadow type="second">
            <Digit type="second">{secondDigit}</Digit>
          </Shadow>
        </Clip>
        <Clip>
          <Shadow type="first">
            <Digit type="first">{firstDigit}</Digit>
          </Shadow>
        </Clip>
        <ErrorMsg>
          OH!
          <Triangle />
        </ErrorMsg>
        <ErrorText>Sorry! Page not found</ErrorText>
        <Button onClick={() => history.push('/')} size="large" type="primary">
          Go to the Home
        </Button>
      </ErrorContainer>
    </Wrapper>
  );
};

export default NotFound;
