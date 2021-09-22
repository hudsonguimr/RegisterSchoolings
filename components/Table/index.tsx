import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { DataTable } from 'react-native-paper';


import { 
  ButtonItems,
  TextItems
 } from './styles';

interface ItemsTableProps extends TouchableOpacityProps {
  esc: string;
  codEsc: string;


}

export function ItemsTable({ esc,codEsc, ...rest }: ItemsTableProps) {
  return (
    <ButtonItems 
      {...rest}
    >
 
    <DataTable>         
    <DataTable.Header>
      <DataTable.Title>Codigo</DataTable.Title>
      <DataTable.Title>Escolaridade</DataTable.Title>
    </DataTable.Header>
    
    <DataTable.Row>     
    <DataTable.Cell><TextItems >{codEsc}</TextItems></DataTable.Cell>
    <DataTable.Cell><TextItems >{esc}</TextItems></DataTable.Cell>
    </DataTable.Row>      
     
      </DataTable>
    </ButtonItems>
  )
}