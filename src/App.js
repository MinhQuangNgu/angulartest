import logo from './logo.svg';
import './App.css';
import * as XLSX from 'xlsx';
import axios from 'axios'
const clientConfig = {
    grant_type: 'client_credentials',
    client_id:
      'ff580d0f-794f-4395-9657-a47dde9f3d0c@f01e930a-b52e-42b1-b70f-a8882b5d043b',
    client_secret: 'ewHOm1PCuTuyxaQ7SRrWaNBCPWP2TmXP31VfPa6eOoQ=',
    resourse:
      '00000003-0000-0ff1-ce00-000000000000/fptsoftware362.sharepoint.com@f01e930a-b52e-42b1-b70f-a8882b5d043b',
};
const getAccessTokenPointUrl = 'https://accounts.accesscontrol.windows.net';
function App() {
  const handleAddFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
    
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
        console.log(jsonData);
    })
    fileReader.readAsArrayBuffer(file);
    getAccessToken();
  }

  const getAccessToken = async() => {
        try{
            const data = await axios.get(`${getAccessTokenPointUrl}/f01e930a-b52e-42b1-b70f-a8882b5d043b/tokens/OAuth/2`);
            console.log(data)
        }
        catch(err){

        }
  }
  return (
    <div className="App">
      <input onChange={handleAddFile} type='file' />
    </div>
  );
}

export default App;
