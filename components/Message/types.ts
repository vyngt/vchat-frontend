export interface Message {
  id: number;
  content: string;
  user: {
    id: number;
    username: string;
  };
  room_id: number;
  created_at: string;
}
