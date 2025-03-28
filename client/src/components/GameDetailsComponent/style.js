import { Col, Image, InputNumber } from "antd";
import styled from "styled-components";
export const WrapperStyleImageSmall = styled(Image)`
  height: 84px;
  width: 84px;
`;
export const WrapperStyleColImage = styled(Col)`
  flex-basis: unset;
  display: flex;
`;
export const WrapperStyleNameProduct = styled.h1`
  color: #ff8c00;
  font-size: 24px;
  font-weight: Arial Black Italic;
  line-height: 32px;
  word-break: break-word;
`;
export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: #fff;
`;
export const WrapperPriceProduct = styled.div`
  border-radius: 4px;
`;
export const WrapperPriceGach = styled.h1`
  color: #c0c0c0;
  text-decoration: line-through;
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
`;
export const WrapperPriceTextProduct = styled.h1`
  color: #6a5acd;
  font-size: 32px;
  line-height: 40px;
  margin-right: 8px;
  font-weight: 500;
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 60px;
    border-top: none;
    border-bottom: none;
    &.ant-input-number-handler-wrap {
      display: none !important;
    }
  }
`;
