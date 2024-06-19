export const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
export const publicKey = 'e44bbf090c18c1c4920c47559c61d706';
export const privateKey = '156a2d00a893f982b1202aad11a2f68b193a7e2a'; 

export function generateHash(ts) {
    return CryptoJS.MD5(ts + privateKey + publicKey).toString();
}