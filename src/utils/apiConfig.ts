import axios from 'axios';

const baseURL = `https://82f1-2405-4802-9421-b12a-c4f8-4128-e0a1-9ac.ngrok-free.app/`;

const data = {
  "accountID": "665f382613e36f62bab16c0d",
  "sessionID": "6662bca25adf31b792be40ac",
};

export default async function apiFetch(endpoint: string, moreData: any){
    try {
        const response = await axios({
            method: 'post',
            url: baseURL + endpoint,
            data: {
                ...data,
                ...moreData,
            },
            headers: { 'Content-Type': 'application/json' },
        });

        console.log('Success:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
    }
}
