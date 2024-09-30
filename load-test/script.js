import http from 'k6/http';


export default function() {
    const payload = JSON.stringify({"name": "Mr. Andy Grant","email": "Rene80@hotmail.com","phoneNumber": "522-393-7566 x14969"});
    http.post('http://localhost:3001/customers', payload, { headers: { 'Content-Type': 'application/json' } });
}