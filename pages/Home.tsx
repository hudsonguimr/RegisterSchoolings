import React ,{useState, useEffect} from 'react';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container,Text, Input,Tittle } from './styles';
import { Button } from '../components/Button';
import { ItemsTable } from '../components/Table';




  interface DataProps {
      id: string;
      codEsc: string;
      esc: string;

  }


  export function Home() {
    const [codEsc, setCodEsc] = useState('');
    const [esc, setEsc] = useState('');
    const [allData, setData] = useState<DataProps[]>([]); 
  

  
  function handleNewRegister() {
    const data = {      
      id: String(new Date().getTime()),
      esc: esc,
      codEsc: codEsc,
    }

    if(esc ==='' || codEsc===''){
      alert('Favor preencher os campos')
      return
    }

    const verify = allData.find(x => x.codEsc === codEsc)
    if(verify){
      alert('Codigo já existente')
      return
    }
  
    setData([...allData, data])
    setCodEsc(''),
    setEsc('')

    }

  function handleRemoveRegister(id: string) {
    setData(allData => allData.filter(data => data.id !== id))
  }
  

  useEffect(() => {
    async function loadData() {
      const storageData = await AsyncStorage.getItem('@allData:data')
      if (storageData) {
        setData(JSON.parse(storageData))
      }
    }

    loadData()

    async function removeAll() {
      await AsyncStorage.removeItem('@allData:data')
    }
  }, [])

  useEffect(() => {
    async function saveData() {
      await AsyncStorage.setItem('@allData:data', JSON.stringify(allData))
    }

    saveData()
  }, [allData])

  


  return(
  <>
  <Tittle>   Registrar Escolaridade</Tittle>
    <Container>
    <Input
           placeholderTextColor='#555'
           value={codEsc}           
           onChangeText={value => setCodEsc(value)}
           onSubmitEditing={handleNewRegister}
           placeholder="Codigo"
           
         />
         <Input
           placeholderTextColor='#555'
           value={esc}           
           onChangeText={value => setEsc(value)}
           onSubmitEditing={handleNewRegister}
           placeholder="Escolaridade"           
         />
         <Button 
          title="Register"
          onPress={handleNewRegister}
         />
       
          
         <FlatList showsVerticalScrollIndicator={false}         
          data={allData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (          
            <ItemsTable             
              esc={item.esc}
              codEsc={item.codEsc}     
              onPress={() => handleRemoveRegister(item.id)}

            />
            
            
          )}
          
        /> 
         
    </Container>
  </>
  )
  }