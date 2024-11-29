declare global {
  interface Window {
    loginViaTelegram: (loginData: {
      id: number;
      first_name: string;
      username: string;
    }) => void;
  }
}
