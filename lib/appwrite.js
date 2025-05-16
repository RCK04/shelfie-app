import { Client, Account, Avatars } from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('680589ee0026c0aed048')
    .setPlatform('dev.rck.shelfie');

export const account = new Account(client);
export const avatars = new Avatars(client);