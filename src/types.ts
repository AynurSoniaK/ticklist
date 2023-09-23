export type Task = {
  id?: string;
  title?: string;
  user: string;
  note?: string;
  createdAt: any;
  dueDate?: any;
  urgent?: boolean;
  completed?: boolean;
};

export type TaskWithId = Task & {
  id: string;
};