import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

export const ErrorContainer = styled.div`
  position: relative;
  text-align: center;
`;

export const Clip = styled.div`
  display: inline-block;
  transform: skew(-45deg);
`;

export const Shadow = styled.div`
  height: 180px;
  overflow: hidden;

  &:after {
    background: linear-gradient(90deg, transparent, rgba(173, 173, 173, 0.8), transparent);
    border-radius: 50%;
    bottom: 0px;
    content: '';
    height: 100%;
    position: absolute;
    right: -5px;
    width: 10px;
    z-index: 9999;
  }

  ${({ type }: any) =>
    type === 'second' &&
    css`
      box-shadow:
        inset 20px 0px 20px -15px rgba(150, 150, 150, 0.8),
        20px 0px 20px -15px rgba(150, 150, 150, 0.8);
      width: 150px;
    `}

  ${({ type }: any) =>
    (type === 'first' || type === 'third') &&
    css`
      width: 250px;
    `}

  ${({ type }: any) =>
    type === 'first' &&
    css`
      &:after {
        left: -5px;
      }
    `}

  @media (max-width: 767px) {
    height: 100px;
    width: 80px;
  }
`;

export const Digit = styled.span`
  background: #07b3f9;
  border-radius: 50%;
  color: white;
  display: inline-block;
  font-size: 120px;
  font-weight: bold;
  height: 150px;
  line-height: 150px;
  position: relative;
  top: 8%;
  transform: skew(45deg);
  width: 150px;

  ${({ type }: any) =>
    type === 'second' &&
    css`
      left: 0;
    `}

  ${({ type }: any) =>
    type === 'first' &&
    css`
      right: 20%;
    `}

  ${({ type }: any) =>
    type === 'third' &&
    css`
      left: 20%;
    `}

  @media (max-width: 767px) {
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 52px;
  }
`;

export const ErrorMsg = styled.div`
  background: #535353;
  border-radius: 50%;
  color: #a2a2a2;
  display: block;
  font-size: 32px;
  font-style: italic;
  height: 80px;
  left: 24%;
  line-height: 80px;
  position: relative;
  top: -290px;
  width: 80px;
  z-index: 9999;

  @media (max-width: 1023px) {
    left: 12%;
  }

  @media (max-width: 767px) {
    top: -160px;
    left: 15%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
`;

export const Triangle = styled.span`
  border-bottom: 15px solid transparent;
  border-left: 20px solid #535353;
  border-top: 15px solid transparent;
  bottom: -4px;
  content: '';
  height: 0;
  position: absolute;
  right: -4px;
  transform: rotate(45deg);
  width: 0;
  z-index: 999;

  @media (max-width: 767px) {
    border-left: 10px solid #535353;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    bottom: -3px;
    right: -1px;
  }
`;

export const ErrorText = styled.h2`
  color: #a2a2a2;
  font-size: 32px;
  font-weight: bold;
  padding-bottom: 20px;

  @media (max-width: 767px) {
    font-size: 24px;
  }
`;
