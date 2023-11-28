export type Client = {
    id: number;
    firstName: string;
    lastName: string;
    birthday: Date;
    paidTill: Date;
    phoneNumber: string;
    curatorId: number | null; // Или другой тип, если необходимо
    createdAt: Date;
    updatedAt: Date;
};

export type Task = {
    id: number;
    text: string;
    deadline: Date;
    isCompleted: boolean;
    curatorId: number | null;
    createdAt: Date;
    updatedAt: Date;
};

